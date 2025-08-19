import { useDate } from '@/shared/lib/useDate'

import { useFlipCalendar } from '@/features/flip'

import { Header } from '@/widgets/Header'
import { Footer } from '@/widgets/Footer'
import { CalendarGrid } from '@/widgets/Calendar'

export function Calendar() {
    const { days, month, displayMonth, year, handlePrevMonth, handleNextMonth } = useDate()
    const { isFlipCalendar } = useFlipCalendar()

    return (
        <div className="flex flex-col items-center">
            <div className="w-full max-w-7xl">
                <Header displayMonth={displayMonth} year={year} handleNextMonth={handleNextMonth} handlePrevMonth={handlePrevMonth} />
                <div className={`transition-all duration-200 ${isFlipCalendar ? 'scale-95 opacity-0' : 'scale-100 opacity-100'}`}>
                    <CalendarGrid days={days} month={month} />
                    <Footer />
                </div>
            </div>
        </div>
    )
}
