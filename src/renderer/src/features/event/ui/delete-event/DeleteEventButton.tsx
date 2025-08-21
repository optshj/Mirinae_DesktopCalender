import { AiFillDelete } from 'react-icons/ai'
import { useEditEvent } from '../../api/useEditEvent'
import { toast } from 'sonner'

interface DeleteEventButtonProps {
    eventId: string
}
export function DeleteEventButton({ eventId }: DeleteEventButtonProps) {
    const { deleteEvent } = useEditEvent()

    return (
        <div
            role="button"
            onDoubleClick={() => {
                deleteEvent(eventId)
                toast.success('일정이 삭제되었습니다.')
            }}
            className="text-base"
        >
            <AiFillDelete className="text-lg" />
        </div>
    )
}
