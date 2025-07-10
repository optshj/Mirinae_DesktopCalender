import { SlArrowLeft, SlArrowRight } from 'react-icons/sl'

import Menu from './Menu'

interface CalendarHeaderProps {
    displayMonth: number
    year: number
    handlePrevMonth: () => void
    handleNextMonth: () => void
}
export default function CalendarHeader({ displayMonth, year, handlePrevMonth, handleNextMonth }: CalendarHeaderProps) {
    return (
        <div className="border-bg-gray mb-2 flex w-full flex-row items-center justify-between rounded-xl border bg-white px-6 py-3">
            <div className="flex flex-row items-center gap-px">
                <div className="p-2">
                    <SlArrowLeft onClick={handlePrevMonth} />
                </div>
                <span className="text-font-black px-4 text-xl font-semibold">
                    {year}년 {displayMonth.toString().padStart(2, '0')}월
                </span>
                <div className="p-2">
                    <SlArrowRight onClick={handleNextMonth} />
                </div>
            </div>
            <Menu />
        </div>
    )
}
