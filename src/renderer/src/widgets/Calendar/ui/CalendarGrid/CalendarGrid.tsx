import { useState } from 'react'
import { isSameDay } from '@/shared/lib/dateFunction'

import { useCalendarItems, useShowHoliday } from '@/features/event'
import { ScheduleModal } from '../ScheduleModal/ScheduleModal'
import { EventList } from '@/entities/event'

interface CalendarGridProps {
    days: Date[]
    month: number
}
export function CalendarGrid({ days, month }: CalendarGridProps) {
    const [modalOpen, setModalOpen] = useState(false)
    const [selectedDate, setSelectedDate] = useState<Date | null>(null)
    const { items, holidayItems } = useCalendarItems()
    const { isShow } = useShowHoliday()

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
            <div className="bg-primary flex w-full flex-col overflow-hidden rounded-xl">
                <div className="text-scondary grid grid-cols-7 bg-[#F9FAFB] text-center font-semibold dark:bg-zinc-800 dark:text-white">
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
                                className={`border-primary flex h-28 w-full flex-col border py-1 ${isToday ? 'shadow-all' : ''}`}
                                onDoubleClick={() => handleDateDoubleClick(date)}
                            >
                                <div className={`pl-2 font-semibold ${isCurrentMonth ? `${isToday ? 'text-main-color' : 'text-primary'}` : 'text-secondary'} `}>
                                    {date.getDate()}
                                </div>
                                <EventList items={items} holidayItems={isShow ? holidayItems : null} date={date} />
                            </div>
                        )
                    })}
                </div>
            </div>

            {modalOpen && selectedDate && <ScheduleModal onClose={closeModal} date={selectedDate} />}
        </>
    )
}
