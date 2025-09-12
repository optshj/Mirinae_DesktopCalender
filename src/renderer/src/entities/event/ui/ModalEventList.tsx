import { EventItemWithColor } from '@/shared/types/EventTypes'

interface ModalEventListProps {
    event: EventItemWithColor
    deleteButton: React.ReactNode
}
export function ModalEventList({ event, deleteButton }: ModalEventListProps) {
    return (
        <div
            key={event.id}
            className="relative flex items-center justify-between rounded-xl p-3 dark:saturate-70"
            style={{
                backgroundColor: `${event.color.background}30`
            }}
        >
            <div
                className="h-full w-2 rounded-xl"
                style={{
                    backgroundColor: event.color.background
                }}
            />
            <div className="text-primary flex-1 pl-4">
                <span className="font-semibold">{event.summary}</span>
                <div className="mt-1 text-xs">
                    {event.start.dateTime ? `${new Date(event.start.dateTime).toLocaleString()} ~ ${new Date(event.end.dateTime).toLocaleString()}` : `${event.start.date} ~ ${event.end.date}`}
                </div>
            </div>
            {event.organizer?.displayName === '대한민국의 휴일' ? null : deleteButton}
        </div>
    )
}
