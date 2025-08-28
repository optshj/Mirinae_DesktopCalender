import { FoldVertical } from 'lucide-react'
import { useFlipCalendar } from '../../model/FlipCalendarContext'

export function FlipButton() {
    const { flipCalendar } = useFlipCalendar()
    return <FoldVertical strokeWidth={1.25} role="button" size={24} onClick={() => flipCalendar()} />
}
