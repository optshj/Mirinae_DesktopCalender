import { useState } from 'react'
import { isSameDay } from '@/shared/lib/dateFunction'

import { useCalendarItems } from '@/features/event'
import { ScheduleModal } from '../ScheduleModal/ScheduleModal'
import { EventList } from '@/entities/event'
import { Dialog, DialogTrigger } from '@/shared/ui/dialog'

interface CalendarGridProps {
    days: Date[]
    month: number
}
export function CalendarGrid({ days, month }: CalendarGridProps) {
    const [selectedDate, setSelectedDate] = useState<Date>(new Date())
    const [open, setOpen] = useState(false)

    const { items } = useCalendarItems()

    const handleDateDoubleClick = (date: Date) => {
        setSelectedDate(date)
        setOpen(true)
    }

    return (
        <div className="bg-primary flex w-full flex-col overflow-hidden rounded-xl">
            <div className="grid grid-cols-7 bg-[#F9FAFB] text-center font-semibold dark:bg-zinc-800">
                {['일', '월', '화', '수', '목', '금', '토'].map((day) => (
                    <div className="py-2" key={day}>
                        {day}
                    </div>
                ))}
            </div>
            <div className="grid grid-cols-7">
                <Dialog open={open} onOpenChange={setOpen}>
                    {days.map((date, i) => {
                        const isCurrentMonth = date.getMonth() === month
                        const isToday = isSameDay(new Date(), date)
                        return (
                            <DialogTrigger key={i} asChild>
                                <div
                                    className={`border-primary flex h-28 w-full flex-col overflow-hidden border py-1`}
                                    onClick={(e) => e.preventDefault()}
                                    onDoubleClick={() => handleDateDoubleClick(date)}
                                >
                                    <div className={`px-1 font-semibold ${isCurrentMonth ? 'text-primary' : 'text-secondary'} `}>
                                        <div className={`${isToday ? 'bg-main-color text-[#f3f4f6]' : ''} flex h-6 w-6 items-center justify-center rounded-full`}>{date.getDate()}</div>
                                    </div>
                                    <EventList items={items} date={date} />
                                </div>
                            </DialogTrigger>
                        )
                    })}
                    <ScheduleModal date={selectedDate!} />
                </Dialog>
            </div>
        </div>
    )
}
