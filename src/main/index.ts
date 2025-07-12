import { app, shell, BrowserWindow, ipcMain, screen, Tray, Menu, nativeImage } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import { attach, detach } from 'electron-as-wallpaper'
import http from 'http'
import crypto from 'crypto'
import keytar from 'keytar'
import Store from 'electron-store'

const SERVICE_NAME = 'mirinae'
const ACCOUNT_NAME = 'google-refresh-token'

const CLIENT_ID = process.env.VITE_CLIENT_ID
const CLIENT_SECRET = process.env.VITE_CLIENT_SECRET
const REDIRECT_URI = 'http://localhost:5858/callback'
const SCOPES = 'https://www.googleapis.com/auth/calendar'

let authServer: http.Server | null = null
let mainWindow: BrowserWindow | null = null
let tray: Tray | null = null
const store = new (Store as any).default({
    defaults: {
        'window-bounds': {
            width: 1280,
            height: 800,
            x: null,
            y: null
        },
        'window-opacity': 1
    }
})

function createWindow(): void {
    const { height: screenHeight } = screen.getPrimaryDisplay().workAreaSize
    const savedBounds = store.get('window-bounds')
    const savedOpacity = store.get('window-opacity')

    mainWindow = new BrowserWindow({
        x: savedBounds.x,
        y: savedBounds.y,
        width: savedBounds.width,
        height: screenHeight,
        show: false,
        frame: false,
        transparent: true,
        skipTaskbar: true,
        type: 'toolbar',
        webPreferences: {
            preload: join(__dirname, '../preload/index.js'),
            sandbox: false
        }
    })

    mainWindow.on('ready-to-show', () => {
        attach(mainWindow!, {
            forwardKeyboardInput: true,
            forwardMouseInput: true
        })
        mainWindow!.setOpacity(savedOpacity)
        mainWindow!.setMenu(null)
        mainWindow!.show()
    })

    if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
        mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
    } else {
        mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
    }
}
function initTray() {
    let iconPath: string

    if (app.isPackaged) {
        iconPath = join(process.resourcesPath, 'resources/icon.png')
    } else {
        iconPath = join(__dirname, '../../resources/icon.png')
    }
    const image = nativeImage.createFromPath(iconPath)

    if (image.isEmpty()) {
        console.error('Failed to load tray icon. The image is empty.')
        return
    }

    tray = new Tray(image)

    const contextMenu = Menu.buildFromTemplate([
        {
            label: '열기',
            click: (): void => {
                mainWindow?.show()
            }
        },
        {
            label: '종료',
            click: (): void => {
                app.quit()
            }
        }
    ])
    tray.setToolTip('미리내')
    tray.setContextMenu(contextMenu)
}

const startAuthServer = (resolve: (code: string) => void, reject: (error: Error) => void) => {
    if (authServer) {
        authServer.close()
    }

    authServer = http
        .createServer((req, res) => {
            const url = new URL(req.url!, `http://${req.headers.host}`)
            const code = url.searchParams.get('code')

            if (code) {
                res.end('<h3>Login Success!, You can Close this tab</h3>')
                resolve(code)
                authServer?.close()
                authServer = null
            } else {
                res.end('<h1>Authentication failed. Please try again.</h1>')
                reject(new Error('No authorization code received.'))
                authServer?.close()
                authServer = null
            }
        })
        .listen(5858)
}

const fetchAccessTokens = async (code: string, codeVerifier: string) => {
    try {
        const params = new URLSearchParams()
        params.append('code', code)
        params.append('client_id', CLIENT_ID!)
        params.append('client_secret', CLIENT_SECRET!)
        params.append('redirect_uri', REDIRECT_URI)
        params.append('grant_type', 'authorization_code')
        params.append('code_verifier', codeVerifier)

        const response = await fetch('https://oauth2.googleapis.com/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: params
        })

        if (!response.ok) throw new Error(`Failed to fetch tokens with status: `)

        const data = await response.json()
        return data // { access_token, refresh_token, ... }
    } catch (error) {
        console.error('Error fetching tokens:', error)
        throw new Error('Failed to fetch tokens')
    }
}

const refreshAccessToken = async (refresh_token: string) => {
    try {
        const params = new URLSearchParams()
        params.append('client_id', CLIENT_ID!)
        params.append('client_secret', CLIENT_SECRET!)
        params.append('refresh_token', refresh_token)
        params.append('grant_type', 'refresh_token')

        const response = await fetch('https://oauth2.googleapis.com/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: params
        })

        if (!response.ok) throw new Error(`Failed to refresh access token`)

        const data = await response.json()
        return data // { access_token, ... }
    } catch (error) {
        throw new Error('Failed to refresh access token')
    }
}
ipcMain.handle('try-auto-login', async () => {
    try {
        const refresh_token = await keytar.getPassword(SERVICE_NAME, ACCOUNT_NAME)
        if (!refresh_token) return null

        const tokenData = await refreshAccessToken(refresh_token)
        if (tokenData.refresh_token) {
            await keytar.setPassword(SERVICE_NAME, ACCOUNT_NAME, tokenData.refresh_token)
        }
        return tokenData
    } catch (err) {
        console.error('Auto-login failed:', err)
        return null
    }
})
ipcMain.handle('logout-google-oauth', async () => {
    try {
        await keytar.deletePassword(SERVICE_NAME, ACCOUNT_NAME)
        return true
    } catch (err) {
        console.error('Logout failed:', err)
        return false
    }
})

ipcMain.on('start-google-oauth', async (event) => {
    const codeVerifier = crypto.randomBytes(32).toString('hex')
    const codeChallenge = crypto.createHash('sha256').update(codeVerifier).digest('base64url')

    const authUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth')
    authUrl.searchParams.append('client_id', CLIENT_ID!)
    authUrl.searchParams.append('redirect_uri', REDIRECT_URI)
    authUrl.searchParams.append('response_type', 'code')
    authUrl.searchParams.append('scope', SCOPES)
    authUrl.searchParams.append('code_challenge', codeChallenge)
    authUrl.searchParams.append('code_challenge_method', 'S256')
    authUrl.searchParams.append('access_type', 'offline')
    authUrl.searchParams.append('prompt', 'consent')

    try {
        shell.openExternal(authUrl.toString())

        const authCode = await new Promise<string>((resolve, reject) => {
            startAuthServer(resolve, reject)
        })

        const tokens = await fetchAccessTokens(authCode, codeVerifier)
        if (tokens.refresh_token) {
            await keytar.setPassword(SERVICE_NAME, ACCOUNT_NAME, tokens.refresh_token)
        }
        event.sender.send('google-oauth-token', tokens)
    } catch (error) {
        console.error('OAuth Error:', error)
        event.sender.send('google-oauth-error')
    }
})
ipcMain.on('quit-app', () => {
    app.quit()
})
ipcMain.on('safe-reload', () => {
    detach(mainWindow!)
    mainWindow!.webContents.reload()
})
ipcMain.on('start-dragging', () => {
    detach(mainWindow!)
})
ipcMain.on('stop-dragging', () => {
    attach(mainWindow!, {
        forwardKeyboardInput: true,
        forwardMouseInput: true
    })
    const { width, height, x, y } = mainWindow!.getBounds()
    store.set('window-bounds', { width, height, x, y })
})
ipcMain.on('set-opacity', (_, newOpacity) => {
    mainWindow!.setOpacity(newOpacity)
    store.set('window-opacity', newOpacity)
})
ipcMain.handle('get-initial-opacity', () => {
    return store.get('window-opacity')
})
app.whenReady().then(() => {
    electronApp.setAppUserModelId('com.electron')
    app.on('browser-window-created', (_, window) => {
        optimizer.watchWindowShortcuts(window)
    })

    createWindow()
    initTray()

    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})
