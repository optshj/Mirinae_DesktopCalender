import TodayEvent from '../TodayEvent'
import UpcomingEvent from '../UpcomingEvent'
import QuickLink from '../QuickLink'
import { useCalendarItems } from '@/app/provider/CalendarItemsProvider'

interface FooterProps {
    quickLinks: any[]
}
export function Footer({ quickLinks }: FooterProps) {
    const { items: todayEvents } = useCalendarItems()

    return (
        <aside className="mt-2 flex h-48 flex-row gap-2">
            <TodayEvent items={todayEvents} />
            <UpcomingEvent items={todayEvents} />
            <QuickLink items={quickLinks} />
        </aside>
    )
}
