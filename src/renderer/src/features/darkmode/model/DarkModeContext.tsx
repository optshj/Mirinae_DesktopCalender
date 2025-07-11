import { createContext, useContext, useEffect, useState, ReactNode } from 'react'

interface DarkModeContextType {
    darkMode: boolean
    toggleDarkMode: () => void
}

export const DarkModeContext = createContext<DarkModeContextType | undefined>(undefined)

export function DarkModeProvider({ children }: { children: ReactNode }) {
    const [darkMode, setDarkMode] = useState(false)

    const updateDarkMode = (isDark: boolean) => {
        setDarkMode(isDark)
        if (isDark) {
            document.documentElement.classList.add('dark')
            localStorage.theme = 'dark'
        } else {
            document.documentElement.classList.remove('dark')
            localStorage.theme = 'light'
        }
    }

    const toggleDarkMode = () => {
        updateDarkMode(!darkMode)
    }

    useEffect(() => {
        const isDark = localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
        updateDarkMode(isDark)
    }, [])

    return <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>{children}</DarkModeContext.Provider>
}

export const useDarkMode = () => {
    const context = useContext(DarkModeContext)
    if (context === undefined) {
        throw new Error('useDarkMode must be used within a DarkModeProvider')
    }
    return context
}
