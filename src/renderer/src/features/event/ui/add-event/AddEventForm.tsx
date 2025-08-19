import { useEffect, useState } from 'react'
import { useEditEvent } from '../../api/useEditEvent'

import HangulInput from '@/shared/ui/HangulInput'
import { toast } from 'sonner'
import { getColorById, getPalette } from '../../utils/getColor'

interface AddEventFormProps {
    date: Date
}
export function AddEventForm({ date }: AddEventFormProps) {
    const [summary, setSummary] = useState('')
    const [colorId, setColorId] = useState('1')
    const [showForm, setShowForm] = useState(false)
    const [startTime, setStartTime] = useState('09:00')
    const [endTime, setEndTime] = useState('09:00')

    const selectedColor = getColorById(colorId).background
    const palette = getPalette()

    const { addEvent } = useEditEvent()

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (performSubmit()) return
        setShowForm(false)
        setSummary('')
        setColorId('1')
        toast.success(`"${summary}" 일정이 추가되었습니다`, {
            description: `${date.toLocaleDateString()} ${startTime} - ${endTime}에 일정이 추가되었습니다.`
        })
    }

    const performSubmit = () => {
        if (!summary.trim()) {
            toast.warning('일정 제목을 입력해주세요')
            return true
        }
        if (endTime < startTime) {
            toast.warning('종료시간은 시작시간 이후여야 합니다')
            return true
        }
        addEvent({ date, startTime, endTime, summary, colorId })
        return false
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
                <form onSubmit={handleSubmit} onKeyDown={handleFormKeyDown} className="flex flex-col gap-4 rounded-xl border p-4 dark:saturate-70" style={{ borderColor: selectedColor }}>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="summary" style={{ color: selectedColor }}>
                            일정 제목
                        </label>
                        <HangulInput
                            id="summary"
                            placeholder="일정을 입력해주세요"
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
                            <label htmlFor="start-time" className="block text-sm font-medium" style={{ color: selectedColor }}>
                                시작 시간
                            </label>
                            <input
                                id="start-time"
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
                            <label htmlFor="end-time" className="block text-sm font-medium" style={{ color: selectedColor }}>
                                종료 시간
                            </label>
                            <input
                                id="end-time"
                                type="time"
                                value={endTime}
                                onChange={(e) => setEndTime(e.target.value)}
                                className="text-primary mt-1 block w-full rounded-lg border border-zinc-300 p-2 focus:ring-0 focus:outline-none dark:saturate-70"
                                style={{ borderColor: selectedColor }}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-6 gap-2 px-2">
                        {palette &&
                            Object.entries(palette).map(([key, color]) => (
                                <div
                                    key={key}
                                    className="inline-block h-6 w-6 cursor-pointer rounded-full dark:saturate-70"
                                    style={{ backgroundColor: color.background }}
                                    onClick={() => setColorId(key)}
                                />
                            ))}
                    </div>
                    <div className="flex items-center justify-end gap-2">
                        <button type="button" className="rounded-lg border border-zinc-300 bg-zinc-100 px-6 py-1.5 font-semibold whitespace-nowrap text-zinc-500" onClick={() => setShowForm(false)}>
                            취소
                        </button>
                        <button type="submit" className="rounded-lg px-6 py-1.5 font-semibold whitespace-nowrap text-white dark:saturate-70" style={{ backgroundColor: selectedColor }}>
                            추가
                        </button>
                    </div>
                </form>
            ) : (
                <div role="button" className="text-secondary mt-2 w-full rounded-xl border-2 border-dashed border-zinc-300 py-3 text-center font-semibold" onClick={() => setShowForm(true)}>
                    + 일정 추가
                </div>
            )}
        </>
    )
}
