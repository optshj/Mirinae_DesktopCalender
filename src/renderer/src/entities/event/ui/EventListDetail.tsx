import { useMemo } from 'react'
import { DeleteEventButton } from '@/features/edit/ui/DeleteEvent'
import { isSameDay } from '@/shared/lib/dateFunction'
import { EventItemWithColor } from '@/shared/types/google'

interface EventListDetailProps {
    items: EventItemWithColor[] | null
    date: Date
    onSuccess: () => Promise<void>
}
export default function EventListDetail({ items, date, onSuccess }: EventListDetailProps) {
    const events = useMemo(() => items?.filter((item) => item.start.dateTime && isSameDay(new Date(item.start.dateTime), date)) ?? [], [items, date])
    return (
        <>
            {events.map((event) => (
                <div key={event.id} className="mb-2 flex items-center justify-between rounded-xl p-3 text-white" style={{ background: event.color.background }}>
                    <div className="flex-1">
                        <span className="font-semibold">{event.summary}</span>
                        <div className="mt-1 text-xs">
                            {event.start.dateTime
                                ? `${new Date(event.start.dateTime).toLocaleString()} ~ ${new Date(event.end.dateTime).toLocaleString()}`
                                : `${event.start.date} ~ ${event.end.date}`}
                        </div>
                    </div>
                    <DeleteEventButton eventId={event.id} onSuccess={onSuccess} />
                </div>
            ))}
        </>
    )
}
