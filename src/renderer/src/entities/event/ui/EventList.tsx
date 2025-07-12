import { formatDateTIme, isSameDay } from '@/shared/lib/dateFunction'
import { EventItemWithColor } from '@/shared/types/EventTypes'

export function EventList({ items, holidayItems, date }: { items: EventItemWithColor[] | null; holidayItems: EventItemWithColor[] | null; date: Date }) {
    const events = items
        ?.filter((item) => {
            if (!item.start.dateTime) return false
            return isSameDay(new Date(item.start.dateTime), date)
        })
        .slice(0, 3)
    const holidays = holidayItems
        ?.filter((item) => {
            if (!item.start.date) return false
            return isSameDay(new Date(item.start.date), date)
        })
        .slice(0, 3)
    return (
        <>
            {holidays?.map((event, i) => (
                <div
                    key={i}
                    style={{
                        background: event.color.background
                    }}
                    className="text-depend mx-2 mt-1 flex items-center overflow-hidden rounded-lg px-2 py-1 text-start text-sm dark:saturate-70"
                >
                    {event.summary}
                </div>
            ))}
            {events?.map((event, i) => (
                <div
                    key={i}
                    style={{
                        background: event.color.background
                    }}
                    className="text-depend mx-2 mt-1 flex items-center overflow-hidden rounded-lg px-2 py-1 text-start text-sm dark:saturate-70"
                >
                    {formatDateTIme(event.start)} {event.summary}
                </div>
            ))}
        </>
    )
}
