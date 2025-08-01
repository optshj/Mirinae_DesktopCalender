import { useCallback, useEffect, useState } from 'react'
import { initialTokens, Tokens } from '../types/userType'

declare global {
    interface Window {
        api: {
            startGoogleOauth: () => void
            onGoogleOauthSuccess: (callback: (token: any) => void) => void
            onGoogleOauthError: (callback: (error: any) => void) => void
            removeListeners: () => void
            tryAutoLogin?: () => Promise<any>
            logoutGoogleOAuth?: () => Promise<void>
            mouseEnter: () => void
            mouseLeave: () => void
            safeReload: () => void
            startDragging: () => void
            stopDragging: () => void
            quitApp: () => void
            setOpacity: (opacity: number) => void
            getInitialOpacity: () => number
        }
    }
}
export function useLogin() {
    const [tokens, setTokens] = useState<Tokens>(initialTokens)

    const handleLogin = useCallback((receivedTokens) => {
        setTokens(receivedTokens)
    }, [])

    const handleError = useCallback((error) => {
        console.error('OAuth Error:', error)
    }, [])

    useEffect(() => {
        if (window.api.tryAutoLogin) {
            window.api.tryAutoLogin().then((restoredTokens) => {
                if (restoredTokens && restoredTokens.access_token) {
                    setTokens(restoredTokens)
                }
            })
        }

        window.api.onGoogleOauthSuccess(handleLogin)
        window.api.onGoogleOauthError(handleError)

        return () => {
            window.api.removeListeners()
        }
    }, [])

    const login = () => {
        window.api.startGoogleOauth()
    }
    const logout = () => {
        setTokens(initialTokens)
        if (window.api.logoutGoogleOAuth) {
            window.api.logoutGoogleOAuth()
        }
    }

    return { login, logout, tokens }
}
