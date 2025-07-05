import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
    interface Window {
        electron: ElectronAPI
        api: {
            startGoogleOauth: () => void
            onGoogleOauthSuccess: (callback: (token: any) => void) => void
            onGoogleOauthError: (callback: (error: any) => void) => void
            removeListeners: () => void
            tryAutoLogin?: () => Promise<any>
            logoutGoogleOAuth?: () => Promise<void>
        }
    }
}
