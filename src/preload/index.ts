import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
const api = {
    startGoogleOauth: () => ipcRenderer.send('start-google-oauth'),
    onGoogleOauthSuccess: (callback) => ipcRenderer.on('google-oauth-token', (_event, ...args) => callback(...args)),
    onGoogleOauthError: (callback) => ipcRenderer.on('google-oauth-error', (_event, ...args) => callback(...args)),
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
