import { useCallback, useEffect, useState } from 'react'
import { initialTokens, Tokens } from '../types/userType'

export function useLogin() {
    const [tokens, setTokens] = useState<Tokens>(initialTokens)

    const login = () => {
        window.api.startGoogleOauth()
    }
    const logout = () => {
        setTokens(initialTokens)
        if (window.api.logoutGoogleOAuth) {
            window.api.logoutGoogleOAuth()
        }
    }

    const handleLogin = useCallback((receivedTokens) => {
        setTokens(receivedTokens)
    }, [])

    const handleError = useCallback((error) => {
        console.error('OAuth Error:', error)
    }, [])

    const tryAutoLogin = useCallback(async () => {
        if (window.api.tryAutoLogin) {
            try {
                const restoredTokens = await window.api.tryAutoLogin()
                if (restoredTokens?.access_token) {
                    setTokens(restoredTokens)
                }
            } catch (err) {
                console.error('Auto login failed:', err)
            }
        }
    }, [])

    useEffect(() => {
        tryAutoLogin()
        // 인터넷 연결 시 자동로그인 시도
        window.addEventListener('online', tryAutoLogin)

        window.api.onGoogleOauthSuccess(handleLogin)
        window.api.onGoogleOauthError(handleError)

        return () => {
            window.api.removeListeners()
            window.removeEventListener('online', tryAutoLogin)
        }
    }, [])

    return { login, logout, tokens }
}
