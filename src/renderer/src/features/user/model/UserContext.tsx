import React, { createContext, useContext } from 'react'
import { useLogin } from '../api/useLogin'
import { initialTokens } from '../types/userType'

const UserContext = createContext({
    login: () => {},
    logout: () => {},
    tokens: initialTokens
})

export function UserProvider({ children }: { children: React.ReactNode }) {
    const { login, logout, tokens } = useLogin()
    return <UserContext.Provider value={{ login, logout, tokens }}>{children}</UserContext.Provider>
}

export function useUser() {
    return useContext(UserContext)
}
