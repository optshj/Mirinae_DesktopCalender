import { useCalendarItems } from '@/features/event'
import { AddEventForm, DeleteEventButton } from '@/features/event'

import { ModalEventList } from '@/entities/event'

import { isSameDay } from '@/shared/lib/dateFunction'
import { DialogContent, DialogHeader, DialogTitle } from '@/shared/ui/dialog'

export function ScheduleModal({ date }: { date: Date }) {
    const { items } = useCalendarItems()
    const events = items.filter((item) => {
        const eventDate = item.start.dateTime ? new Date(item.start.dateTime) : new Date(item.start.date)
        return isSameDay(eventDate, date)
    })
    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle>
                    {date.getMonth() + 1}월 {date.getDate()}일 일정
                </DialogTitle>
            </DialogHeader>
            {events.map((event) => (
                <ModalEventList key={event.id} event={event} deleteButton={<DeleteEventButton eventId={event.id} />} />
            ))}
            <AddEventForm date={date} />
        </DialogContent>
    )
}
