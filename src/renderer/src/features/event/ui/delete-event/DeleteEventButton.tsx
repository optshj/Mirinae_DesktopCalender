import { IoCloseOutline } from 'react-icons/io5'
import { useDeleteEvent } from './DeleteEventButton.mutation'
import { toast } from 'sonner'

interface DeleteEventButtonProps {
    eventId: string
}
export function DeleteEventButton({ eventId }: DeleteEventButtonProps) {
    const { deleteEvent } = useDeleteEvent()

    return (
        <button
            onDoubleClick={(e) => {
                e.stopPropagation()
                deleteEvent(eventId)
                toast.success('일정이 삭제되었습니다.')
            }}
        >
            <IoCloseOutline />
        </button>
    )
}
