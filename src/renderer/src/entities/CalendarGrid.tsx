import { useState } from 'react'
import { isSameDay } from '@/shared/lib/dateFunction'
import { EventItemWithColor } from '@/shared/types/google'

import ScheduleModal from './ScheduleModal'

interface CalendarGridProps {
    days: Date[]
    month: number
    items: EventItemWithColor[] | null
    onSuccess: () => Promise<void>
}
export default function CalendarGrid({ days, month, items, onSuccess }: CalendarGridProps) {
    const [modalOpen, setModalOpen] = useState(false)
    const [selectedDate, setSelectedDate] = useState<Date | null>(null)

    const handleDateDoubleClick = (date: Date) => {
        setSelectedDate(date)
        setModalOpen(true)
    }

    const closeModal = () => {
        setModalOpen(false)
        setSelectedDate(null)
    }

    return (
        <>
            <div className="border-bg-gray flex w-full flex-col overflow-hidden rounded-xl border bg-white">
                <div className="grid grid-cols-7 bg-[#F9FAFB] text-center font-semibold text-[#4B5563]">
                    {['일', '월', '화', '수', '목', '금', '토'].map((day) => (
                        <div className="py-2" key={day}>
                            {day}
                        </div>
                    ))}
                </div>
                <div className="grid grid-cols-7">
                    {days.map((date, idx) => {
                        const isCurrentMonth = date.getMonth() === month
                        const isToday = isSameDay(new Date(), date)
                        return (
                            <div
                                key={idx}
                                className={`border-bg-gray flex h-28 w-full flex-col border py-1 ${isToday ? 'shadow-all' : ''}`}
                                onDoubleClick={() => handleDateDoubleClick(date)}
                            >
                                <div
                                    className={`border-bg-gray pl-2 font-semibold ${isCurrentMonth ? `${isToday ? 'text-main-color' : 'text-[#111827]'}` : 'text-font-gray'} `}
                                >
                                    {date.getDate()}
                                </div>
                                <EventList items={items} date={date} />
                            </div>
                        )
                    })}
                </div>
            </div>

            {modalOpen && selectedDate && <ScheduleModal onClose={closeModal} date={selectedDate} items={items} onSuccess={onSuccess} />}
        </>
    )
}

function EventList({ items, date }: { items: EventItemWithColor[] | null; date: Date }) {
    const events =
        items
            ?.filter((item) => {
                if (!item.start.dateTime) return false
                return isSameDay(new Date(item.start.dateTime), date)
            })
            .slice(0, 3) ?? []
    return (
        <>
            {events.map((event, i) => (
                <div
                    key={i}
                    style={{
                        background: event.color.background
                    }}
                    className={`mx-2 mt-1 flex items-center overflow-hidden rounded-lg px-2 py-1 text-start text-sm text-white`}
                >
                    {event.summary}
                </div>
            ))}
        </>
    )
}
