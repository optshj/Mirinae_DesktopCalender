import { EventItemWithColor } from '@/shared/types/EventTypes'

export function EventItem({ event }: { event: EventItemWithColor }) {
    return (
        <div className="flex-1">
            <span className="font-semibold">{event.summary}</span>
            <div className="mt-1 text-xs">
                {event.start.dateTime
                    ? `${new Date(event.start.dateTime).toLocaleString()} ~ ${new Date(event.end.dateTime).toLocaleString()}`
                    : `${event.start.date} ~ ${event.end.date}`}
            </div>
        </div>
    )
}
