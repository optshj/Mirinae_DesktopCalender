import { EventItemWithColor } from '@/shared/types/EventTypes'

interface ModalEventListProps {
    event: EventItemWithColor
    deleteButton?: React.ReactNode
}
export function ModalEventList({ event, deleteButton }: ModalEventListProps) {
    return (
        <div
            key={event.id}
            className="text-depend flex items-center justify-between rounded-xl p-3 dark:saturate-70"
            style={{ background: event.color.background }}
        >
            <div className="flex-1">
                <span className="font-semibold">{event.summary}</span>
                <div className="mt-1 text-xs">
                    {event.start.dateTime
                        ? `${new Date(event.start.dateTime).toLocaleString()} ~ ${new Date(event.end.dateTime).toLocaleString()}`
                        : `${event.start.date} ~ ${event.end.date}`}
                </div>
            </div>
            {deleteButton}
        </div>
    )
}
