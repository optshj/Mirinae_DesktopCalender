import { useShowHoliday } from '../../model/ShowHolidayContext'

export function HolidayButton() {
    const { isShow, handleShow } = useShowHoliday()
    return (
        <div className="flex flex-row items-center justify-between">
            <label>공휴일표시</label>
            <button
                onClick={handleShow}
                className={`border-background-secondary relative flex h-6 w-12 cursor-pointer items-center justify-center rounded-full transition-colors duration-300 ${isShow ? 'bg-green-500' : 'bg-zinc-400'}`}
            >
                <div className={`absolute h-5 w-5 rounded-full bg-white p-1 transition-all duration-300 ${isShow ? 'left-[55%]' : 'left-[5%]'} `} />
            </button>
        </div>
    )
}
