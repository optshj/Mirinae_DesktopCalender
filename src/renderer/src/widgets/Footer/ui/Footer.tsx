import { TodayEvent, UpcomingEvent } from '@/entities/event'
import QuickLink from '../QuickLink'
import { useCalendarItems } from '@/features/calendar'

export function Footer() {
    const { items: todayEvents } = useCalendarItems()

    return (
        <aside className="mt-2 flex h-48 flex-row gap-2">
            <TodayEvent items={todayEvents} />
            <UpcomingEvent items={todayEvents} />
            <QuickLink />
        </aside>
    )
}
