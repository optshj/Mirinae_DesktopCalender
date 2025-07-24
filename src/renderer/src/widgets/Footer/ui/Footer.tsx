import { ImportantEvent, TodayEvent, UpcomingEvent } from '@/entities/event'
import { useCalendarItems } from '@/features/event'

export function Footer() {
    const { items } = useCalendarItems()

    return (
        <aside className="mt-2 flex h-48 flex-row gap-2">
            <TodayEvent items={items} />
            <UpcomingEvent items={items} />
            <ImportantEvent items={items} />
        </aside>
    )
}
