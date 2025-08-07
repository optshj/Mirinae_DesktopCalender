import { useCalendarItems, useShowHoliday } from '@/features/event'
import { AddEventForm, DeleteEventButton } from '@/features/event'

import { ModalEventList } from '@/entities/event'

import { isSameDay } from '@/shared/lib/dateFunction'
import { DialogContent, DialogHeader, DialogTitle } from '@/shared/ui/dialog'

export function ScheduleModal({ date }: { date: Date }) {
    const { items, holidayItems, colors } = useCalendarItems()
    const { isShow } = useShowHoliday()
    const events =
        items?.filter((item) => {
            if (!item.start.dateTime) return false
            return isSameDay(new Date(item.start.dateTime), date)
        }) ?? []
    const holidays =
        holidayItems?.filter((item) => {
            if (!item.start.date) return false
            return isSameDay(new Date(item.start.date), date)
        }) ?? []

    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle>
                    {date.getMonth() + 1}월 {date.getDate()}일 일정
                </DialogTitle>
            </DialogHeader>
            {isShow && holidays.map((event) => <ModalEventList key={event.id} event={event} />)}
            {events.map((event) => (
                <ModalEventList key={event.id} event={event} deleteButton={<DeleteEventButton eventId={event.id} />} />
            ))}
            <AddEventForm date={date} colors={colors} />
        </DialogContent>
    )
}
