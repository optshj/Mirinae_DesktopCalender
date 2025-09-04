import { FoldVertical, UnfoldVertical } from 'lucide-react'
import { useFlipCalendar } from '../../model/FlipCalendarContext'

export function FlipButton() {
    const { flipCalendar, isFlipCalendar } = useFlipCalendar()
    return (
        <>
            {isFlipCalendar ? (
                <UnfoldVertical strokeWidth={1.5} role="button" size={24} onClick={() => flipCalendar()} />
            ) : (
                <FoldVertical strokeWidth={1.5} role="button" size={24} onClick={() => flipCalendar()} />
            )}
        </>
    )
}
