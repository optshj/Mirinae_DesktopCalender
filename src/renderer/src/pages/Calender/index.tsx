import { useDate } from '@/shared/lib/useDate'

import CalendarHeader from '@/widgets/layout/Header'
import CalendarGrid from '@/widgets/calendar/CalendarGrid'
import Footer from '@/widgets/layout/Footer'
import { useFlipCalendar } from '@/app/provider/FlipCalendar'

export default function Calendar() {
    const { days, month, displayMonth, year, handlePrevMonth, handleNextMonth } = useDate()
    const { isFlipCalendar } = useFlipCalendar()

    return (
        <div className="flex flex-col items-center">
            <div className="w-full max-w-7xl">
                <CalendarHeader displayMonth={displayMonth} year={year} handleNextMonth={handleNextMonth} handlePrevMonth={handlePrevMonth} />
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
