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
        <div className="rounded px-2 py-1 select-none">
            <label>다크모드</label>
            <div
                onClick={toggleDarkMode}
                className="border-background-secondary relative flex h-8 w-[90px] cursor-pointer items-center justify-center rounded-full bg-yellow-400 transition-colors duration-300 dark:bg-gray-600"
            >
                <div
                    className={`absolute text-sm font-semibold text-white transition-all duration-300 ease-in-out dark:text-gray-200 ${
                        darkMode ? 'left-[50%]' : 'left-[10%]'
                    }`}
                >
                    {darkMode ? 'Dark' : 'Light'}
                </div>

                <div className={`absolute h-6 w-6 rounded-full bg-white p-1 transition-all duration-300 ease-in-out ${darkMode ? 'left-[5%]' : 'left-[65%]'}`}>
                    {darkMode ? <MdDarkMode className="h-full w-full text-gray-700" /> : <MdLightMode className="h-full w-full text-yellow-400" />}
                </div>
            </div>
        </div>
    )
}
