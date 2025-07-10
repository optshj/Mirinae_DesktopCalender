import { useState } from 'react'
import { useLogin } from '@/features/user/api/useLogin'
import { ColorType } from '@/shared/types/google'
import HangulInput from '@/shared/ui/HangulInput'
import { useEditEvent } from '../api/useEditEvent'

interface AddEventFormProps {
    date: Date
    colors: ColorType | null
    onSuccess: () => Promise<void>
    onCancel: () => void
}

export default function AddEventForm({ date, colors, onSuccess, onCancel }: AddEventFormProps) {
    const { tokens } = useLogin()
    const { addEvent, loading } = useEditEvent(tokens.access_token)
    const handleFormKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
        if (e.ctrlKey && e.key === 'Enter') {
            e.preventDefault()
            handleSubmit(e as any)
        }
    }

    const [summary, setSummary] = useState('')
    const [colorId, setColorId] = useState('1')

    const selectedColor = colors?.event?.[colorId]?.background || '#1F2937'

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (loading || !summary.trim()) return

        await addEvent(date, summary, colorId)
        await onSuccess()
    }

    return (
        <form
            onSubmit={handleSubmit}
            onKeyDown={handleFormKeyDown}
            className="mt-2 flex flex-col gap-3 rounded-xl border bg-white p-4"
            style={{ borderColor: selectedColor }}
        >
            <div className="flex flex-col gap-1">
                <label style={{ color: selectedColor }}>일정 제목</label>
                <HangulInput
                    id="summary"
                    className="rounded-lg border border-zinc-300 py-2 pr-20 pl-3 focus:ring-0 focus:outline-none"
                    type="text"
                    value={summary}
                    onChange={(newSummary) => setSummary(newSummary)}
                    required
                    autoFocus
                    style={{ borderColor: selectedColor }}
                />
            </div>
            <div className="grid grid-cols-6 gap-2 px-2">
                {colors &&
                    Object.entries(colors.event).map(([key, color]) => (
                        <div
                            key={key}
                            className="inline-block h-6 w-6 cursor-pointer rounded-full"
                            style={{ backgroundColor: color.background }}
                            onClick={() => setColorId(key)}
                        />
                    ))}
            </div>
            <div className="mt-2 flex gap-2">
                <button type="submit" className="flex-1 rounded-lg px-3 py-2 font-semibold text-white shadow" style={{ backgroundColor: selectedColor }}>
                    추가
                </button>
                <button type="button" className="flex-1 rounded-lg border border-zinc-300 bg-zinc-100 px-3 py-2 font-semibold text-zinc-500" onClick={onCancel}>
                    취소
                </button>
            </div>
        </form>
    )
}
