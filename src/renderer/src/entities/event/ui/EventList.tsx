import { formatDateTIme, isSameDay } from '@/shared/lib/dateFunction'
import { EventItemWithColor } from '@/shared/types/EventTypes'

export function EventList({ items, date }: { items: EventItemWithColor[] | null; date: Date }) {
    const events =
        items?.filter((item) => {
            if (!item.start.dateTime && !item.start.date) return false
            const eventDate = item.start.dateTime ? new Date(item.start.dateTime) : new Date(item.start.date)
            return isSameDay(eventDate, date)
        }) ?? []
    return (
        <>
            {events.slice(0, 4).map((event, i) => (
                <div
                    key={i}
                    style={{
                        background: event.color.background
                    }}
                    className="text-depend mx-2 mt-1 flex items-center truncate overflow-hidden rounded-lg px-2 py-1 text-sm dark:saturate-70"
                >
                    {formatDateTIme(event.start)} {event.summary}
                </div>
            ))}
        </>
    )
}
