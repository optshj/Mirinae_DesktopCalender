import { useEffect, useState } from 'react'
import { ColorType } from '@/shared/types/EventTypes'
import { useEditEvent } from '../api/useEditEvent'
import HangulInput from '@/shared/ui/HangulInput'
import { useLogin } from '@/features/user'
import { useCalendarItems } from '@/features/event'

interface AddEventFormProps {
    date: Date
    colors: ColorType | null
}
export function AddEventForm({ date, colors }: AddEventFormProps) {
    const [summary, setSummary] = useState('')
    const [colorId, setColorId] = useState('1')
    const [showForm, setShowForm] = useState(false)

    const [startTime, setStartTime] = useState('09:00')
    const [endTime, setEndTime] = useState('10:00')

    const selectedColor = colors?.event?.[colorId]?.background || '#1F2937'
    const { refresh } = useCalendarItems()
    const { tokens } = useLogin()
    const { addEvent, loading } = useEditEvent(tokens.access_token)

    const handleFormKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
        if (e.ctrlKey && e.key === 'Enter') {
            e.preventDefault()
            handleSubmit(e)
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (loading || !summary.trim()) return

        const [startHour, startMinute] = startTime.split(':').map(Number)
        const startDateTime = new Date(date)
        startDateTime.setHours(startHour, startMinute, 0, 0)

        const [endHour, endMinute] = endTime.split(':').map(Number)
        const endDateTime = new Date(date)
        endDateTime.setHours(endHour, endMinute, 0, 0)

        await addEvent(startDateTime, endDateTime, summary, colorId)
        await refresh()

        setShowForm(false)
        setSummary('')
        setColorId('1')
    }

    return (
        <>
            {showForm ? (
                <form
                    onSubmit={handleSubmit}
                    onKeyDown={handleFormKeyDown}
                    className="mt-2 flex flex-col gap-3 rounded-xl border p-4 dark:saturate-70"
                    style={{ borderColor: selectedColor }}
                >
                    <div className="flex flex-col gap-1">
                        <label style={{ color: selectedColor }}>일정 제목</label>
                        <HangulInput
                            id="summary"
                            className="text-primary rounded-lg border border-zinc-300 py-2 pr-20 pl-3 focus:ring-0 focus:outline-none dark:saturate-70"
                            type="text"
                            value={summary}
                            onChange={(newSummary) => setSummary(newSummary)}
                            required
                            autoFocus
                            style={{ borderColor: selectedColor }}
                        />
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="flex-1">
                            <label className="block text-sm font-medium" style={{ color: selectedColor }}>
                                시작 시간
                            </label>
                            <input
                                type="time"
                                value={startTime}
                                onChange={(e) => {
                                    setStartTime(e.target.value)
                                    setEndTime(e.target.value)
                                }}
                                className="text-primary mt-1 block w-full rounded-lg border border-zinc-300 p-2 focus:ring-0 focus:outline-none dark:saturate-70"
                                style={{ borderColor: selectedColor }}
                            />
                        </div>
                        <div className="flex-1">
                            <label className="block text-sm font-medium" style={{ color: selectedColor }}>
                                종료 시간
                            </label>
                            <input
                                type="time"
                                value={endTime}
                                onChange={(e) => setEndTime(e.target.value)}
                                className="text-primary mt-1 block w-full rounded-lg border border-zinc-300 p-2 focus:ring-0 focus:outline-none dark:saturate-70"
                                style={{ borderColor: selectedColor }}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-6 gap-2 px-2">
                        {colors &&
                            Object.entries(colors.event).map(([key, color]) => (
                                <div
                                    key={key}
                                    className="inline-block h-6 w-6 cursor-pointer rounded-full dark:saturate-70"
                                    style={{ backgroundColor: color.background }}
                                    onClick={() => setColorId(key)}
                                />
                            ))}
                    </div>
                    <div className="mt-2 flex gap-2">
                        <button
                            type="submit"
                            className="flex-1 rounded-lg px-3 py-2 font-semibold text-white shadow dark:saturate-70"
                            style={{ backgroundColor: selectedColor }}
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
                    className="text-primary mt-2 w-full rounded-xl border-2 border-dashed border-zinc-300 py-3 text-center font-semibold"
                    onClick={() => setShowForm(true)}
                    type="button"
                >
                    + 일정 추가
                </button>
            )}
        </>
    )
}
