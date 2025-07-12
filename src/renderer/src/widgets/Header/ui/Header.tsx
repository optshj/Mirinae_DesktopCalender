import { SlArrowLeft, SlArrowRight } from 'react-icons/sl'
import { IoMdMore } from 'react-icons/io'
import DropDown from '@/shared/ui/DropDown'

import { MoveActiveButton, MoveButton } from '@/features/move'
import { FlipButton } from '@/features/flip'
import { RefreshButton } from '@/features/refresh'
import { LoginButton } from '@/features/user'
import { OpacityButton } from '@/features/opacity'
import { QuitAppButton } from '@/features/quit'
import { DarkModeButton } from '@/features/darkmode'
import { HolidayButton } from '@/features/event'

interface CalendarHeaderProps {
    displayMonth: number
    year: number
    handlePrevMonth: () => void
    handleNextMonth: () => void
}
export function Header({ displayMonth, year, handlePrevMonth, handleNextMonth }: CalendarHeaderProps) {
    return (
        <div className="bg-primary text-primary mb-2 flex w-full flex-row items-center justify-between rounded-xl px-6 py-3">
            <div className="flex flex-row items-center gap-px">
                <div className="p-2">
                    <SlArrowLeft onClick={handlePrevMonth} />
                </div>
                <div className="px-4 text-xl font-semibold">
                    {year}년 {displayMonth.toString().padStart(2, '0')}월
                </div>
                <div className="p-2">
                    <SlArrowRight onClick={handleNextMonth} />
                </div>
            </div>

            <div className="text-primary flex items-center gap-4">
                <FlipButton />
                <MoveButton />
                <RefreshButton />
                <DropDown trigger={<IoMdMore size={32} />} align="right">
                    <LoginButton />
                    <MoveActiveButton />
                    <OpacityButton />
                    <DarkModeButton />
                    <HolidayButton />
                    <QuitAppButton />
                </DropDown>
            </div>
        </div>
    )
}
