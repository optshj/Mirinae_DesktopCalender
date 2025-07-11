import { useDate } from '@/shared/lib/useDate'

import { useFlipCalendar } from '@/app/provider/FlipCalendarProvider'

import { Header } from '@/widgets/Header'
import { Footer } from '@/widgets/Footer'
import { CalendarGrid } from '@/widgets/Calendar'

export default function Calendar() {
    const { days, month, displayMonth, year, handlePrevMonth, handleNextMonth } = useDate()
    const { isFlipCalendar } = useFlipCalendar()

    return (
        <div className="flex flex-col items-center">
            <div className="w-full max-w-7xl">
                <Header displayMonth={displayMonth} year={year} handleNextMonth={handleNextMonth} handlePrevMonth={handlePrevMonth} />
                {isFlipCalendar ? null : (
                    <>
                        <CalendarGrid days={days} month={month} />
                        <Footer quickLinks={[]} />
                    </>
                )}
            </div>
        </div>
    )
}
