import { useEffect, useState } from 'react'

import { Check } from 'lucide-react'
import { getColorById, getPalette } from '../../lib/getColor'

import HangulInput from '@/shared/ui/HangulInput'
import { toast } from 'sonner'
import { Dial } from '../Dial'
import { useEditEvent } from './EditEventForm.mutation'
import { EventItemWithColor } from '@/shared/types/EventTypes'
import { ISO8601toSimpleTime } from '@/shared/lib/dateFunction'

interface FormState {
    summary: string
    colorId: string
    startTime: string
    endTime: string
}
interface EditEventForm {
    event: EventItemWithColor
    deleteButton: React.ReactNode
}
export function EditEventForm({ event, deleteButton }: EditEventForm) {
    const [showForm, setShowForm] = useState(false)
    const [form, setForm] = useState<FormState>({
        summary: event.summary,
        colorId: event.colorId,
        startTime: ISO8601toSimpleTime(event.start.dateTime),
        endTime: ISO8601toSimpleTime(event.end.dateTime)
    })
    const updateForm = (key: keyof FormState, value: string) => setForm((prev) => ({ ...prev, [key]: value }))

    const selectedColor = getColorById(form.colorId).background
    const palette = getPalette()
    const date = new Date(event.start.dateTime)
    const { editEvent } = useEditEvent()

    const handleSubmit = () => {
        if (performSubmit()) return
        setShowForm(false)
        toast.success(`"${form.summary}" 일정이 수정되었습니다`, {
            description: `${date.toLocaleDateString()} ${form.startTime} - ${form.endTime}에 일정이 수정되었습니다.`
        })
    }
    const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        handleSubmit()
    }

    const performSubmit = () => {
        if (!form.summary.trim()) {
            toast.warning('일정 제목을 입력해주세요')
            return true
        }
        editEvent({ eventId: event.id, date, ...form })
        return false
    }
    const openForm = () => {
        if (event.organizer?.displayName !== '대한민국의 휴일') setShowForm(true)
    }

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.ctrlKey && e.key === 'Enter') {
                e.preventDefault()
                if (showForm) handleSubmit()
            }
        }
        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [showForm, form])

    return (
        <>
            {showForm ? (
                <form id="edit-event-form" onSubmit={onFormSubmit} className="flex flex-col gap-4 rounded-xl border p-4 dark:saturate-70" style={{ borderColor: selectedColor }}>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="summary" style={{ color: selectedColor }}>
                            일정 제목
                        </label>
                        <HangulInput
                            id="summary"
                            placeholder="일정을 입력해주세요"
                            className="text-primary rounded-lg border border-zinc-300 py-2 pr-20 pl-3 focus:ring-0 focus:outline-none dark:saturate-70"
                            type="text"
                            value={form.summary}
                            onChange={(newSummary) => updateForm('summary', newSummary)}
                            autoFocus
                            style={{ borderColor: selectedColor }}
                        />
                    </div>
                    <div>
                        <label style={{ color: selectedColor }}>시간 선택</label>
                        <div className="relative -my-5 flex flex-col items-center justify-center">
                            <div className="text-primary absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col">
                                <div>
                                    <span style={{ color: selectedColor }}>{`시작 : `}</span>
                                    <span>{`${form.startTime}`}</span>
                                </div>
                                <div>
                                    <span style={{ color: selectedColor }}>{`종료 : `}</span>
                                    <span>{`${form.endTime}`}</span>
                                </div>
                            </div>
                            <Dial updateForm={updateForm} color={selectedColor} defaultTime={[form.startTime, form.endTime]} />
                        </div>
                    </div>
                    <div className="grid grid-cols-6 gap-2 px-2">
                        {Object.entries(palette).map(([key, color]) => (
                            <div
                                key={key}
                                className="m flex h-6 w-6 cursor-pointer items-center justify-center rounded-full dark:saturate-70"
                                style={{ backgroundColor: color.background }}
                                onClick={() => updateForm('colorId', key)}
                            >
                                {form.colorId === key && <Check className="text-white" size={16} />}
                            </div>
                        ))}
                    </div>
                    <div className="flex items-center justify-end gap-2">
                        <button type="button" className="rounded-lg border border-zinc-300 bg-zinc-100 px-6 py-1.5 font-semibold whitespace-nowrap text-zinc-500" onClick={() => setShowForm(false)}>
                            취소
                        </button>
                        <button type="submit" className="rounded-lg px-6 py-1.5 font-semibold whitespace-nowrap text-white dark:saturate-70" style={{ backgroundColor: selectedColor }}>
                            수정
                        </button>
                    </div>
                </form>
            ) : (
                // 아이템 렌더링
                <div
                    key={event.id}
                    className="relative flex items-center justify-between rounded-xl p-3 dark:saturate-70"
                    style={{
                        backgroundColor: `${event.color.background}30`
                    }}
                    onDoubleClick={() => openForm()}
                >
                    <div
                        className="h-full w-2 rounded-xl"
                        style={{
                            backgroundColor: event.color.background
                        }}
                    />
                    <div className="text-primary flex-1 pl-4">
                        <span className="font-semibold">{event.summary}</span>
                        <div className="mt-1 text-xs">
                            {event.start.dateTime ? `${new Date(event.start.dateTime).toLocaleString()} ~ ${new Date(event.end.dateTime).toLocaleString()}` : `${event.start.date} ~ ${event.end.date}`}
                        </div>
                    </div>
                    {event.organizer?.displayName === '대한민국의 휴일' ? null : deleteButton}
                </div>
            )}
        </>
    )
}
