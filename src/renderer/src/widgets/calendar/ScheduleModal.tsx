import { useEffect, useState } from 'react'
import { ColorType, EventItemWithColor } from '@/shared/types/google'
import Modal from '@/shared/ui/Modal'

import AddEventForm from '@/features/edit/ui/AddEvent'
import EventListDetail from '@/entities/event/ui/EventListDetail'

interface ScheduleModalProps {
    date: Date
    items: EventItemWithColor[] | null
    colors: ColorType | null
    onClose: () => void
    onSuccess: () => Promise<void>
}

export default function ScheduleModal({ date, items, colors, onClose, onSuccess }: ScheduleModalProps) {
    const [showForm, setShowForm] = useState(false)

    const handleAddSuccess = async () => {
        await onSuccess()
        setShowForm(false)
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
            <EventListDetail items={items} date={date} onSuccess={onSuccess} />

            {showForm ? (
                <AddEventForm date={date} colors={colors} onSuccess={handleAddSuccess} onCancel={() => setShowForm(false)} />
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
