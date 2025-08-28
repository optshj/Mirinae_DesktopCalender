import { IoCloseOutline } from 'react-icons/io5'
import { useEditEvent } from '../../api/useEditEvent'
import { toast } from 'sonner'

interface DeleteEventButtonProps {
    eventId: string
}
export function DeleteEventButton({ eventId }: DeleteEventButtonProps) {
    const { deleteEvent } = useEditEvent()

    return (
        <button
            onDoubleClick={() => {
                deleteEvent(eventId)
                toast.success('일정이 삭제되었습니다.')
            }}
        >
            <IoCloseOutline />
        </button>
    )
}
