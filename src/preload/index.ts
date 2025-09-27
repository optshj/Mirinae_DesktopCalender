import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

export interface Api {
    startGoogleOauth: () => void
    onGoogleOauthSuccess: (callback: (tokens: any) => void) => void
    onGoogleOauthError: (callback: (error: any) => void) => void
    tryAutoLogin: () => Promise<any>
    logoutGoogleOAuth: () => Promise<boolean>
    safeReload: () => void
    startDragging: () => void
    stopDragging: () => void
    quitApp: () => void
    enableInputForwarding: () => void
    disableInputForwarding: () => void
    setOpacity: (opacity: number) => void
    getInitialOpacity: () => Promise<number>
    removeListeners: () => void
    onShowPatchNotes: (callback: () => void) => () => void
}

const api = {
    startGoogleOauth: () => ipcRenderer.send('start-google-oauth'),

    onGoogleOauthSuccess: (callback) => {
        ipcRenderer.removeAllListeners('google-oauth-token')
        ipcRenderer.on('google-oauth-token', (_event, ...args) => callback(...args))
    },
    onGoogleOauthError: (callback) => {
        ipcRenderer.removeAllListeners('google-oauth-error')
        ipcRenderer.on('google-oauth-error', (_event, ...args) => callback(...args))
    },

    tryAutoLogin: () => ipcRenderer.invoke('try-auto-login'),
    logoutGoogleOAuth: () => ipcRenderer.invoke('logout-google-oauth'),
    safeReload: () => ipcRenderer.send('safe-reload'),
    startDragging: () => ipcRenderer.send('start-dragging'),
    stopDragging: () => ipcRenderer.send('stop-dragging'),
    quitApp: () => ipcRenderer.send('quit-app'),
    enableInputForwarding: () => ipcRenderer.send('enable-input-forwarding'),
    disableInputForwarding: () => ipcRenderer.send('disable-input-forwarding'),
    setOpacity: (opacity: number) => ipcRenderer.send('set-opacity', opacity),
    getInitialOpacity: () => ipcRenderer.invoke('get-initial-opacity'),
    onShowPatchNotes: (callback) => {
        const listener = (_event, ...args) => callback(...args)
        ipcRenderer.on('show-patch-notes', listener)
        return () => {
            ipcRenderer.removeListener('show-patch-notes', listener)
        }
    },
    removeListeners: () => {
        ipcRenderer.removeAllListeners()
    }
}

// Use `contextBridge` to expose Electron APIs to the renderer only if
// context isolation is enabled, otherwise just add to the DOM global.
if (process.contextIsolated) {
    try {
        contextBridge.exposeInMainWorld('electron', electronAPI)
        contextBridge.exposeInMainWorld('api', api)
    } catch (error) {
        console.error(error)
    }
} else {
    // @ts-ignore (define in dts)
    window.electron = electronAPI
    // @ts-ignore (define in dts)
    window.api = api
}
