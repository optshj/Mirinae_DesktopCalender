import { useCalendarItems, useShowHoliday } from '@/features/event'
import { AddEventForm, DeleteEventButton } from '@/features/event'

import { EventItem } from '@/entities/event'

import Modal from '@/shared/ui/Modal'
import { isSameDay } from '@/shared/lib/dateFunction'

interface ScheduleModalProps {
    date: Date
    onClose: () => void
}
export function ScheduleModal({ date, onClose }: ScheduleModalProps) {
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
        <Modal onClose={onClose}>
            <div className="text-primary mb-2 text-lg font-bold" style={{ textAlign: 'center' }}>
                {date.getMonth() + 1}월 {date.getDate()}일 일정
            </div>
            {isShow &&
                holidays.map((event) => (
                    <div
                        key={event.id}
                        className="text-depend mb-2 flex items-center justify-between rounded-xl p-3 dark:saturate-70"
                        style={{ background: event.color.background }}
                    >
                        <EventItem event={event} />
                    </div>
                ))}
            {events.map((event) => (
                <div
                    key={event.id}
                    className="text-depend mb-2 flex items-center justify-between rounded-xl p-3 dark:saturate-70"
                    style={{ background: event.color.background }}
                >
                    <EventItem event={event} />
                    <DeleteEventButton eventId={event.id} />
                </div>
            ))}
            <AddEventForm date={date} colors={colors} />
        </Modal>
    )
}
