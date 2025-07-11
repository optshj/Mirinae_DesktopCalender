import { LuFoldVertical } from 'react-icons/lu'
import { useFlipCalendar } from '../model/FlipCalendarContext'

export function FlipButton() {
    const { flipCalendar } = useFlipCalendar()
    return <LuFoldVertical size={24} onClick={() => flipCalendar()} />
}
