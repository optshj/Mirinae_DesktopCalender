import { IoMdMore } from 'react-icons/io'
import DropDown from '@/shared/ui/DropDown'

import { LoginButton } from '@/features/user'
import { OpacityButton } from '@/features/opacity'
import { QuitAppButton } from '@/features/quit'
import { DarkModeButton } from '@/features/darkmode'
import { HolidayButton } from '@/features/event'
import { MoveActiveButton } from '@/features/move'

export function HeaderDropDown() {
    return (
        <DropDown trigger={<IoMdMore size={32} />} align="right">
            <LoginButton />
            <MoveActiveButton />
            <OpacityButton />
            <DarkModeButton />
            <HolidayButton />
            <QuitAppButton />
        </DropDown>
    )
}
