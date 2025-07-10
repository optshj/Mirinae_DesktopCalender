import { useLogin } from '@/features/user/api/useLogin'
import { useDate } from '@/shared/lib/useDate'
import { useGoogleCalendar } from '@/shared/api/useGoogleCalendar'

import CalendarHeader from '@/widgets/layout/Header'
import CalendarGrid from '@/widgets/calendar/CalendarGrid'
import Footer from '@/widgets/layout/Footer'

export default function Calendar() {
    const { tokens } = useLogin()
    const { items: event, refresh, colors } = useGoogleCalendar(tokens.access_token)
    const { days, month, displayMonth, year, handlePrevMonth, handleNextMonth } = useDate()
    const onSuccess = async () => {
        await refresh()
    }

    return (
        <div className="flex flex-col items-center">
            <div className="w-full max-w-7xl">
                <CalendarHeader displayMonth={displayMonth} year={year} handleNextMonth={handleNextMonth} handlePrevMonth={handlePrevMonth} />
                <CalendarGrid days={days} month={month} items={event} colors={colors} onSuccess={onSuccess} />
                <Footer todayEvents={event} quickLinks={[]} />
            </div>
        </div>
    )
}
