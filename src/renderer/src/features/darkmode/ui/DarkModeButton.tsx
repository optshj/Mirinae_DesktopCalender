import { useState, useEffect } from 'react'
import { MdDarkMode, MdLightMode } from 'react-icons/md'

export function DarkModeButton() {
    const [darkMode, setDarkMode] = useState(false)

    useEffect(() => {
        const storedTheme = localStorage.getItem('theme')
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
        if (storedTheme === 'dark' || (!storedTheme && prefersDark)) {
            setDarkMode(true)
            document.documentElement.classList.add('dark')
        } else {
            setDarkMode(false)
            document.documentElement.classList.remove('dark')
        }
    }, [])

    const toggleDarkMode = () => {
        setDarkMode((prev) => {
            const newDark = !prev
            if (newDark) {
                document.documentElement.classList.add('dark')
                localStorage.setItem('theme', 'dark')
            } else {
                document.documentElement.classList.remove('dark')
                localStorage.setItem('theme', 'light')
            }
            return newDark
        })
    }

    return (
        <div className="flex flex-row justify-between select-none">
            <label>다크모드</label>
            <div
                role="button"
                onClick={toggleDarkMode}
                className="relative flex h-6 w-12 cursor-pointer items-center justify-center rounded-full bg-yellow-400 transition-colors duration-300 dark:bg-gray-500"
            >
                <div className={`absolute h-5 w-5 rounded-full bg-white p-1 transition-all duration-300 ${darkMode ? 'left-[5%]' : 'left-[55%]'}`}>
                    {darkMode ? <MdDarkMode className="h-full w-full text-gray-500" /> : <MdLightMode className="h-full w-full text-yellow-400" />}
                </div>
            </div>
        </div>
    )
}
