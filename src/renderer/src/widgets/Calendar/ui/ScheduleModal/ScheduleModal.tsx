import Modal from '@/shared/ui/Modal'
import { useEffect, useState } from 'react'
import { ColorType, EventItemWithColor } from '@/shared/types/google'
import { useCalendarItems } from '@/app/provider/CalendarItemsProvider'
import { EventListDetail } from '@/entities/event'

import { AddEventForm } from '@/features/edit'

interface ScheduleModalProps {
    date: Date
    items: EventItemWithColor[] | null
    colors: ColorType | null
    onClose: () => void
}

export function ScheduleModal({ date, items, colors, onClose }: ScheduleModalProps) {
    const [showForm, setShowForm] = useState(false)
    const { refresh } = useCalendarItems()
    const handleAddSuccess = async () => {
        await refresh()
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
            <div className="text-primary mb-2 text-lg font-bold" style={{ textAlign: 'center' }}>
                {date.getMonth() + 1}월 {date.getDate()}일 일정
            </div>
            <EventListDetail items={items} date={date} onSuccess={refresh} />

            {showForm ? (
                <AddEventForm date={date} colors={colors} onSuccess={handleAddSuccess} onCancel={() => setShowForm(false)} />
            ) : (
                <button
                    className="text-primary mt-2 w-full rounded-xl border-2 border-dashed border-zinc-300 py-3 text-center font-semibold"
                    onClick={() => setShowForm(true)}
                    type="button"
                >
                    + 일정 추가
                </button>
            )}
        </Modal>
    )
}
