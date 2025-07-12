import { useShowHoliday } from '../model/ShowHolidayContext'

export function HolidayButton() {
    const { isShow, handleShow } = useShowHoliday()
    return (
        <div className="rounded px-2 py-1">
            <label>공휴일표시</label>
            <div
                onClick={handleShow}
                className={`border-background-secondary relative flex h-8 w-[90px] cursor-pointer items-center justify-center rounded-full transition-colors duration-300 dark:saturate-70 ${isShow ? 'bg-green-500' : 'bg-zinc-500'}`}
            >
                <div className={`absolute text-sm font-semibold text-white transition-all duration-300 ease-in-out ${isShow ? 'left-[10%]' : 'left-[65%]'} `}>
                    {isShow ? 'On' : 'Off'}
                </div>

                <div className={`absolute h-6 w-6 rounded-full bg-white p-1 transition-all duration-300 ease-in-out ${isShow ? 'left-[65%]' : 'left-[5%]'} `} />
            </div>
        </div>
    )
}
