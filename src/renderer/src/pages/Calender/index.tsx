import { useDate } from '@/shared/lib/useDate'

import { useFlipCalendar } from '@/features/flip'

import { Header } from '@/widgets/Header'
import { Footer } from '@/widgets/Footer'
import { CalendarGrid } from '@/widgets/Calendar'
import { PatchNoteModal } from '@/entities/patchNote'

export function Calendar() {
    const { days, month, displayMonth, year, handlePrevMonth, handleNextMonth } = useDate()
    const { isFlipCalendar } = useFlipCalendar()

    return (
        <div className="flex flex-col items-center">
            <Header displayMonth={displayMonth} year={year} handleNextMonth={handleNextMonth} handlePrevMonth={handlePrevMonth} />
            <div className={`w-full transition-all duration-300 ease-in-out ${isFlipCalendar ? 'pointer-events-none mt-[-16px] scale-95 opacity-0' : 'mt-0 scale-100 opacity-100'} `}>
                <CalendarGrid days={days} month={month} />
                <Footer />
            </div>
            <PatchNoteModal />
        </div>
    )
}
