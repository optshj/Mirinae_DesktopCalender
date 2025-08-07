import { useEffect, useState, useCallback } from 'react'
import { useEditEvent } from '../api/useEditEvent'
import { useCalendarItems } from '@/features/event'

import { ColorType } from '@/shared/types/EventTypes'
import HangulInput from '@/shared/ui/HangulInput'

interface AddEventFormProps {
    date: Date
    colors: ColorType | null
}
export function AddEventForm({ date, colors }: AddEventFormProps) {
    const [summary, setSummary] = useState('')
    const [colorId, setColorId] = useState('1')
    const [showForm, setShowForm] = useState(false)
    const [startTime, setStartTime] = useState('09:00')
    const [endTime, setEndTime] = useState('09:00')
    const [timeError, setTimeError] = useState('')

    const selectedColor = colors?.event?.[colorId]?.background || '#1F2937'

    const { refresh } = useCalendarItems()
    const { addEvent, loading } = useEditEvent()

    const performSubmit = useCallback(async () => {
        if (loading) return
        if (!summary.trim()) {
            setTimeError('일정 제목을 입력해주세요')
            return
        }
        if (endTime < startTime) {
            setTimeError('종료시간은 시작시간 이후여야 합니다')
            return
        } else {
            setTimeError('')
        }

        await addEvent(date, startTime, endTime, summary, colorId)
        await refresh()

        setShowForm(false)
        setSummary('')
        setColorId('1')
    }, [loading, summary, startTime, endTime, date, addEvent, refresh, colorId])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        await performSubmit()
    }

    const handleFormKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
        if (e.ctrlKey && e.key === 'Enter') {
            e.preventDefault()
            handleSubmit(e)
        }
    }

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.ctrlKey && e.key === 'Enter') {
                if (showForm) {
                    e.preventDefault()
                    performSubmit()
                } else {
                    setShowForm(true)
                }
            }
        }
        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [showForm, performSubmit])

    return (
        <>
            {showForm ? (
                <form
                    onSubmit={handleSubmit}
                    onKeyDown={handleFormKeyDown}
                    className="flex flex-col gap-4 rounded-xl border p-4 dark:saturate-70"
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
                    <div className="mt-2 flex items-center justify-between gap-2">
                        <div className="flex-shrink-0">{timeError && <div className="animate-shake text-xs text-red-500">{timeError}</div>}</div>
                        <div className="flex items-center gap-2">
                            <button
                                type="button"
                                className="rounded-lg border border-zinc-300 bg-zinc-100 px-6 py-1.5 font-semibold whitespace-nowrap text-zinc-500"
                                onClick={() => setShowForm(false)}
                            >
                                취소
                            </button>
                            <button
                                type="submit"
                                className="rounded-lg px-6 py-1.5 font-semibold whitespace-nowrap text-white dark:saturate-70"
                                style={{ backgroundColor: selectedColor }}
                            >
                                추가
                            </button>
                        </div>
                    </div>
                </form>
            ) : (
                <button
                    className="text-secondary mt-2 w-full rounded-xl border-2 border-dashed border-zinc-300 py-3 text-center font-semibold"
                    onClick={() => setShowForm(true)}
                    type="button"
                >
                    + 일정 추가
                </button>
            )}
        </>
    )
}
