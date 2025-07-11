import { useMemo } from 'react'
import { useCalendarItems } from '@/features/calendar'
import { AddEventForm, DeleteEventButton } from '@/features/edit'

import { EventItem } from '@/entities/event'

import Modal from '@/shared/ui/Modal'
import { ColorType, EventItemWithColor } from '@/shared/types/EventTypes'
import { isSameDay } from '@/shared/lib/dateFunction'

interface ScheduleModalProps {
    date: Date
    items: EventItemWithColor[] | null
    colors: ColorType | null
    onClose: () => void
}
export function ScheduleModal({ date, items, colors, onClose }: ScheduleModalProps) {
    const events = useMemo(() => items?.filter((item) => item.start.dateTime && isSameDay(new Date(item.start.dateTime), date)) ?? [], [items, date])
    const { refresh } = useCalendarItems()

    return (
        <Modal onClose={onClose}>
            <div className="text-primary mb-2 text-lg font-bold" style={{ textAlign: 'center' }}>
                {date.getMonth() + 1}월 {date.getDate()}일 일정
            </div>
            {events.map((event) => (
                <div
                    key={event.id}
                    className="text-depend mb-2 flex items-center justify-between rounded-xl p-3 dark:saturate-70"
                    style={{ background: event.color.background }}
                >
                    <EventItem event={event} />
                    <DeleteEventButton eventId={event.id} onSuccess={refresh} />
                </div>
            ))}
            <AddEventForm date={date} colors={colors} />
        </Modal>
    )
}
