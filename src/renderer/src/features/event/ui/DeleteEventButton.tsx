import { AiFillDelete } from 'react-icons/ai'
import { useEditEvent } from '../../event/api/useEditEvent'
import { useCalendarItems } from '../model/CalendarItemsContext'

interface DeleteEventButtonProps {
    eventId: string
}
export function DeleteEventButton({ eventId }: DeleteEventButtonProps) {
    const { deleteEvent, loading } = useEditEvent()
    const { refresh } = useCalendarItems()

    const handleDelete = async () => {
        if (loading) return
        await deleteEvent(eventId)
        await refresh()
    }

    return (
        <button onClick={handleDelete} disabled={loading} className="text-base">
            <AiFillDelete className="text-lg" />
        </button>
    )
}
