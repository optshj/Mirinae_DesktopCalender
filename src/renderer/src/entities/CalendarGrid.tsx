import { useEffect, useState } from 'react'
import { isSameDay } from '@/shared/lib/dateFunction'
import { EventItemWithColor } from '@/shared/types/google'

import Modal from '@/widgets/Modal'
import { useEditEvent } from '@/shared/api/useGoogleCalendar'
import { useLogin } from '@/shared/api/useLogin'
import HangulInput from '@/widgets/HangulInput'

interface CalendarGridProps {
    days: Date[]
    month: number
    items: EventItemWithColor[] | null
}
export default function CalendarGrid({ days, month, items }: CalendarGridProps) {
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

            {modalOpen && selectedDate && (
                <Modal onClose={closeModal}>
                    <DayEventList date={selectedDate} items={items} />
                </Modal>
            )}
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

function DayEventList({ date, items }: { date: Date; items: EventItemWithColor[] | null }) {
    const { tokens } = useLogin()
    const [showForm, setShowForm] = useState(false)
    const [summary, setSummary] = useState('')
    const [time, setTime] = useState('09:00')
    const { addEvent } = useEditEvent(tokens.access_token)
    const events =
        items?.filter((item) => {
            if (!item.start.dateTime) return false
            return isSameDay(new Date(item.start.dateTime), date)
        }) ?? []

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        ;(addEvent(new Date(`${date.toISOString().split('T')[0]}T${time}:00`), new Date(`${date.toISOString().split('T')[0]}T${time}:00`), summary),
            setShowForm(false))
        setSummary('')
        setTime('')
    }

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.ctrlKey && e.key === 'Enter') {
                setShowForm(true)
            }
        }
        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [])
    return (
        <div>
            <div className="mb-2 text-lg font-bold">
                {date.getMonth() + 1}월 {date.getDate()}일 일정
            </div>
            {events.map((event, i) => (
                <div key={i} className="mb-2 rounded-xl p-2 text-white" style={{ background: event.color.background }}>
                    <div className="font-semibold">{event.summary}</div>
                    <div className="text-xs">
                        {event.start.dateTime
                            ? `${new Date(event.start.dateTime).toLocaleString()} ~ ${new Date(event.end.dateTime).toLocaleString()}`
                            : `${event.start.date} ~ ${event.end.date}`}
                    </div>
                </div>
            ))}
            {showForm ? (
                <form onSubmit={handleSubmit} className="border-main-color animate-fade-in mt-2 flex flex-col gap-3 rounded-xl border bg-white p-4">
                    <div className="flex flex-col gap-1">
                        <label className="text-main-color mb-1 text-xs font-semibold" htmlFor="summary">
                            일정 제목
                        </label>
                        <HangulInput
                            id="summary"
                            className="focus:ring-main-color rounded-lg border border-zinc-300 px-3 py-2 transition focus:ring-2 focus:outline-none"
                            type="text"
                            placeholder="예: 회의, 약속"
                            value={summary}
                            onChange={(newSummary) => setSummary(newSummary)}
                            required
                            autoFocus
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-main-color mb-1 text-xs font-semibold" htmlFor="time">
                            시작 시간
                        </label>
                        <input
                            id="time"
                            className="focus:ring-main-color rounded-lg border border-zinc-300 px-3 py-2 transition focus:ring-2 focus:outline-none"
                            type="time"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                        />
                    </div>
                    <div className="mt-2 flex gap-2">
                        <button
                            type="submit"
                            className="bg-main-color hover:bg-main-color/90 flex-1 rounded-lg px-3 py-2 font-semibold text-white shadow transition"
                        >
                            추가
                        </button>
                        <button
                            type="button"
                            className="flex-1 rounded-lg border border-zinc-300 bg-zinc-100 px-3 py-2 font-semibold text-zinc-500 transition hover:bg-zinc-200"
                            onClick={() => setShowForm(false)}
                        >
                            취소
                        </button>
                    </div>
                </form>
            ) : (
                <button
                    className="hover:border-main-color hover:text-main-color mt-2 w-full rounded-xl border-2 border-dashed border-zinc-300 py-3 text-center font-semibold text-zinc-400 transition"
                    onClick={() => setShowForm(true)}
                    type="button"
                >
                    + 일정 추가
                </button>
            )}
        </div>
    )
}
