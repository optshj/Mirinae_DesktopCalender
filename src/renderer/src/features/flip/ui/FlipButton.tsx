import { LuFoldVertical } from 'react-icons/lu'
import { useFlipCalendar } from '@/app/provider/FlipCalendarProvider'

export function FlipButton() {
    const { flipCalendar } = useFlipCalendar()
    return <LuFoldVertical size={24} onClick={() => flipCalendar()} />
}
