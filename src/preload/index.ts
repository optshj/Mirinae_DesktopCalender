import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

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
    setOpacity: (opacity) => ipcRenderer.send('set-opacity', opacity),
    getInitialOpacity: () => ipcRenderer.invoke('get-initial-opacity'),

    removeListeners: () => {
        ipcRenderer.removeAllListeners('google-oauth-token')
        ipcRenderer.removeAllListeners('google-oauth-error')
        ipcRenderer.removeAllListeners('try-auto-login')
        ipcRenderer.removeAllListeners('logout-google-oauth')
        ipcRenderer.removeAllListeners('safe-reload')
        ipcRenderer.removeAllListeners('start-dragging')
        ipcRenderer.removeAllListeners('stop-dragging')
        ipcRenderer.removeAllListeners('quit-app')
        ipcRenderer.removeAllListeners('set-opacity')
        ipcRenderer.removeAllListeners('get-initial-opacity')
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
