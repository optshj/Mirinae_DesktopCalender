import { useDarkMode } from '@/app/provider/DarkModeProvider'
import { MdDarkMode, MdLightMode } from 'react-icons/md'

export default function Darkmode() {
    const { darkMode, toggleDarkMode } = useDarkMode()

    return (
        <div
            onClick={toggleDarkMode}
            className="border-background-secondary relative flex h-10 w-[90px] cursor-pointer items-center justify-center rounded-full bg-yellow-400 transition-colors duration-300 dark:bg-gray-600"
        >
            <div
                className={`absolute text-sm font-semibold text-white transition-all duration-300 ease-in-out dark:text-gray-200 ${darkMode ? 'left-[45%]' : 'left-[10%]'} `}
            >
                {darkMode ? 'Dark' : 'Light'}
            </div>

            <div className={`absolute h-7 w-7 rounded-full bg-white p-1 transition-all duration-300 ease-in-out ${darkMode ? 'left-[5%]' : 'left-[60%]'} `}>
                {darkMode ? <MdDarkMode className="h-full w-full text-gray-700" /> : <MdLightMode className="h-full w-full text-yellow-400" />}
            </div>
        </div>
    )
}
