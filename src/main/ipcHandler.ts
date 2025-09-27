import { ipcMain, app } from 'electron'
import { attach, detach } from 'electron-as-wallpaper'
import { mainWindow } from '.'
import { tryAutoLogin, logoutGoogleOAuth, startGoogleOAuth } from './oauth'
import { store } from './store'

export const registerIPCHandlers = () => {
    ipcMain.handle('try-auto-login', tryAutoLogin)
    ipcMain.handle('logout-google-oauth', logoutGoogleOAuth)
    ipcMain.on('start-google-oauth', startGoogleOAuth)

    ipcMain.on('quit-app', () => {
        app.quit()
    })
    ipcMain.on('start-dragging', () => {
        detach(mainWindow)
        mainWindow.setResizable(true)
    })
    ipcMain.on('stop-dragging', () => {
        mainWindow.setResizable(false)
        attach(mainWindow, { forwardKeyboardInput: false, forwardMouseInput: false })
        const { width, height, x, y } = mainWindow.getBounds()
        store.set('window-bounds', { width, height, x, y })
    })
    ipcMain.on('enable-input-forwarding', () => {
        if ((mainWindow as any)._isAttached) {
            detach(mainWindow)
            attach(mainWindow, { forwardKeyboardInput: true, forwardMouseInput: true })
        }
    })
    ipcMain.on('disable-input-forwarding', () => {
        if ((mainWindow as any)._isAttached) {
            detach(mainWindow)
            attach(mainWindow, { forwardKeyboardInput: false, forwardMouseInput: false })
        }
    })
    ipcMain.on('set-opacity', (_, newOpacity) => {
        mainWindow.setOpacity(newOpacity)
        store.set('window-opacity', newOpacity)
    })
    ipcMain.handle('get-initial-opacity', () => store.get('window-opacity'))
}
