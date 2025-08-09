import { AiFillDelete } from 'react-icons/ai'
import { useEditEvent } from '../../event/api/useEditEvent'

interface DeleteEventButtonProps {
    eventId: string
}
export function DeleteEventButton({ eventId }: DeleteEventButtonProps) {
    const { deleteEvent } = useEditEvent()

    return (
        <button onClick={() => deleteEvent(eventId)} className="text-base">
            <AiFillDelete className="text-lg" />
        </button>
    )
}
