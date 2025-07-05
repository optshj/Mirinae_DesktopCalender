import { useLogin } from '@/shared/api/useLogin'
import { useDate } from '@/shared/lib/useDate'
import { useGoogleCalendar } from '@/shared/api/useGoogleCalendar'

import CalendarHeader from '@/entities/CalendarHeader'
import CalendarGrid from '@/entities/CalendarGrid'
import Footer from '@/entities/Footer'

export default function Calendar() {
    const { tokens } = useLogin()
    const { items: event } = useGoogleCalendar(tokens.access_token)
    const { days, month, displayMonth, year, handlePrevMonth, handleNextMonth } = useDate()

    return (
        <div className="flex flex-col items-center">
            <div className="w-full max-w-7xl">
                <CalendarHeader displayMonth={displayMonth} year={year} handleNextMonth={handleNextMonth} handlePrevMonth={handlePrevMonth} />
                <CalendarGrid days={days} month={month} items={event} />
                <Footer todayEvents={event} quickLinks={[]} />
            </div>
        </div>
    )
}
