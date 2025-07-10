import { useState } from 'react'
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

    return (
        <Modal onClose={onClose}>
            <div className="mb-2 text-lg font-bold">
                {date.getMonth() + 1}월 {date.getDate()}일 일정
            </div>
            <EventListDetail items={items} date={date} onSuccess={onSuccess} />

            {showForm ? (
                <AddEventForm date={date} colors={colors} onSuccess={handleAddSuccess} onCancel={() => setShowForm(false)} />
            ) : (
                <button onClick={() => setShowForm(true)}>+ 일정 추가</button>
            )}
        </Modal>
    )
}
