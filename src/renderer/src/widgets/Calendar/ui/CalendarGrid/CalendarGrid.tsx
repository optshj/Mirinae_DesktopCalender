import { useState } from 'react'
import { isSameDay } from '@/shared/lib/dateFunction'

import { useCalendarItems, useShowHoliday } from '@/features/event'
import { ScheduleModal } from '../ScheduleModal/ScheduleModal'
import { EventList } from '@/entities/event'
import { Dialog, DialogTrigger } from '@/shared/ui/dialog'

interface CalendarGridProps {
    days: Date[]
    month: number
}
export function CalendarGrid({ days, month }: CalendarGridProps) {
    const [selectedDate, setSelectedDate] = useState<Date>(new Date())

    const { items, holidayItems } = useCalendarItems()
    const { isShow } = useShowHoliday()

    const handleDateDoubleClick = (date: Date) => {
        setSelectedDate(date)
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
                    <Dialog>
                        {days.map((date, i) => {
                            const isCurrentMonth = date.getMonth() === month
                            const isToday = isSameDay(new Date(), date)
                            return (
                                <DialogTrigger key={i}>
                                    <div
                                        className={`border-primary flex h-28 w-full flex-col border py-1 ${isToday ? 'shadow-all' : ''}`}
                                        onClick={() => handleDateDoubleClick(date)}
                                    >
                                        <div
                                            className={`px-2 text-left font-semibold ${isCurrentMonth ? `${isToday ? 'text-main-color' : 'text-primary'}` : 'text-secondary'} `}
                                        >
                                            {date.getDate()}
                                        </div>
                                        <EventList items={items} holidayItems={isShow ? holidayItems : null} date={date} />
                                    </div>
                                </DialogTrigger>
                            )
                        })}
                        <ScheduleModal date={selectedDate!} />
                    </Dialog>
                </div>
            </div>
        </>
    )
}
