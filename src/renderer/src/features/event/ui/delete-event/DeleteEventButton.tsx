import { AiFillDelete } from 'react-icons/ai'
import { useEditEvent } from '../../api/useEditEvent'

interface DeleteEventButtonProps {
    eventId: string
}
export function DeleteEventButton({ eventId }: DeleteEventButtonProps) {
    const { deleteEvent } = useEditEvent()

    return (
        <div role="button" onClick={() => deleteEvent(eventId)} className="text-base">
            <AiFillDelete className="text-lg" />
        </div>
    )
}
