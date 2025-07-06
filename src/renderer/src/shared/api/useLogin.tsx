import { useEffect, useState } from 'react'

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
        }
    }
}

interface Tokens {
    access_token: string
    refresh_token?: string
    expires_in?: number
    scope?: string
    token_type?: string
}
const initialTokens: Tokens = {
    access_token: '',
    refresh_token: undefined,
    expires_in: undefined,
    scope: undefined,
    token_type: undefined
}
export function useLogin() {
    const [tokens, setTokens] = useState<Tokens>(initialTokens)

    const handleLogin = (receivedTokens) => {
        setTokens(receivedTokens)
    }

    const handleError = (error) => {
        console.error('OAuth Error:', error)
    }

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
