import { useEffect, useState } from 'react'
import { useEditEvent } from '@/shared/api/useGoogleCalendar'
import { useLogin } from '@/shared/api/useLogin'

import { BiTrashAlt } from 'react-icons/bi'

import HangulInput from '@/widgets/HangulInput'
import Modal from '@/widgets/Modal'
import { isSameDay } from '@/shared/lib/dateFunction'
import { ColorType, EventItemWithColor } from '@/shared/types/google'

interface ScheduleModalProps {
    date: Date
    items: EventItemWithColor[] | null
    onClose: () => void
    colors: ColorType | null
    onSuccess: () => Promise<void>
}
export default function ScheduleModal({ date, items, onClose, colors, onSuccess }: ScheduleModalProps) {
    const { tokens } = useLogin()
    const [showForm, setShowForm] = useState(false)
    const [summary, setSummary] = useState('')
    const [color, setColor] = useState('1')
    const { addEvent, deleteEvent } = useEditEvent(tokens.access_token)

    const events =
        items?.filter((item) => {
            if (!item.start.dateTime) return false
            return isSameDay(new Date(item.start.dateTime), date)
        }) ?? []

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        await addEvent(date, summary, color)
        await onSuccess()
        setShowForm(false)
        setSummary('')
    }
    const handleDelete = async (eventId: string) => {
        await deleteEvent(eventId)
        await onSuccess()
    }
    const handleFormKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
        if (e.ctrlKey && e.key === 'Enter') {
            e.preventDefault()
            handleSubmit(e as any)
        }
    }
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.ctrlKey && e.key === 'Enter' && !showForm) {
                setShowForm(true)
            }
        }
        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [])

    return (
        <Modal onClose={onClose}>
            <div className="mb-2 text-lg font-bold">
                {date.getMonth() + 1}월 {date.getDate()}일 일정
            </div>
            {events.map((event, i) => (
                <div key={i} className="mb-2 rounded-xl p-3 text-white" style={{ background: event.color.background }}>
                    <div className="flex items-center justify-between">
                        <span className="font-semibold">{event.summary}</span>

                        <button onClick={() => handleDelete(event.id)} className="text-base text-red-300" aria-label="일정 삭제">
                            <BiTrashAlt className="text-lg" />
                        </button>
                    </div>

                    <div className="mt-1 text-xs">
                        {event.start.dateTime
                            ? `${new Date(event.start.dateTime).toLocaleString()} ~ ${new Date(event.end.dateTime).toLocaleString()}`
                            : `${event.start.date} ~ ${event.end.date}`}
                    </div>
                </div>
            ))}
            {showForm ? (
                <form
                    onSubmit={handleSubmit}
                    onKeyDown={handleFormKeyDown}
                    className="animate-fade-in mt-2 flex flex-col gap-3 rounded-xl border bg-white p-4"
                    style={{ borderColor: colors?.event[color]?.background }}
                >
                    <div className="flex flex-col gap-1">
                        <label className="mb-1 text-xs font-semibold" htmlFor="summary" style={{ color: colors?.event[color]?.background }}>
                            일정 제목
                        </label>
                        <HangulInput
                            id="summary"
                            className="rounded-lg border border-zinc-300 py-2 pr-20 pl-3 focus:outline-none"
                            style={{ borderColor: colors?.event[color]?.background }}
                            type="text"
                            color={colors?.event[color]?.background}
                            value={summary}
                            onChange={(newSummary) => setSummary(newSummary)}
                            required
                            autoFocus
                        />
                    </div>
                    <div className="grid grid-cols-6 px-2">
                        {colors &&
                            Object.entries(colors.event).map(([key, color]) => (
                                <div key={key}>
                                    <span
                                        className="inline-block h-6 w-6 rounded-full"
                                        style={{ backgroundColor: color.background }}
                                        title={color.foreground}
                                        onClick={() => setColor(key)}
                                    ></span>
                                </div>
                            ))}
                    </div>
                    <div className="flex gap-2">
                        <button
                            type="submit"
                            className="flex-1 rounded-lg px-3 py-2 font-semibold text-white shadow"
                            style={{ backgroundColor: colors?.event[color]?.background }}
                        >
                            추가
                        </button>
                        <button
                            type="button"
                            className="flex-1 rounded-lg border border-zinc-300 bg-zinc-100 px-3 py-2 font-semibold text-zinc-500"
                            onClick={() => setShowForm(false)}
                        >
                            취소
                        </button>
                    </div>
                </form>
            ) : (
                <button
                    className="mt-2 w-full rounded-xl border-2 border-dashed border-zinc-300 py-3 text-center font-semibold text-zinc-400"
                    onClick={() => setShowForm(true)}
                    type="button"
                >
                    + 일정 추가
                </button>
            )}
        </Modal>
    )
}
