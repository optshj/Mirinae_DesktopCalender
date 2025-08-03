import { useLogin } from '@/features/user/api/useLogin'
import { BiTrashAlt } from 'react-icons/bi'
import { useEditEvent } from '../../event/api/useEditEvent'

interface DeleteEventButtonProps {
    eventId: string
    onSuccess: () => Promise<void>
}
export function DeleteEventButton({ eventId, onSuccess }: DeleteEventButtonProps) {
    const { tokens } = useLogin()
    const { deleteEvent, loading } = useEditEvent(tokens.access_token)

    const handleDelete = async () => {
        if (loading) return
        await deleteEvent(eventId)
        await onSuccess()
    }

    return (
        <button onClick={handleDelete} disabled={loading} className="text-base text-red-300" aria-label="일정 삭제">
            <BiTrashAlt className="text-lg" />
        </button>
    )
}
