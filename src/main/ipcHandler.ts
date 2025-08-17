import { ipcMain, app } from 'electron'
import { attach, detach, reset } from 'electron-as-wallpaper'
import { mainWindow } from '.'
import { tryAutoLogin, logoutGoogleOAuth, startGoogleOAuth } from './oauth'
import { store } from './store'

export const registerIPCHandlers = () => {
    ipcMain.handle('try-auto-login', tryAutoLogin)
    ipcMain.handle('logout-google-oauth', logoutGoogleOAuth)
    ipcMain.on('start-google-oauth', startGoogleOAuth)

    ipcMain.on('quit-app', () => {
        app.quit()
        reset()
    })
    ipcMain.on('start-dragging', () => detach(mainWindow))
    ipcMain.on('stop-dragging', () => {
        attach(mainWindow, { forwardKeyboardInput: true, forwardMouseInput: true })
        const { width, height, x, y } = mainWindow.getBounds()
        store.set('window-bounds', { width, height, x, y })
    })
    ipcMain.on('set-opacity', (_, newOpacity) => {
        mainWindow.setOpacity(newOpacity)
        store.set('window-opacity', newOpacity)
    })
    ipcMain.handle('get-initial-opacity', () => store.get('window-opacity'))
}
