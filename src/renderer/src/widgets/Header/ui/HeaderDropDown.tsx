import DropDown from '@/shared/ui/DropDown'

import { LoginButton } from '@/features/user'
import { OpacityButton } from '@/features/opacity'
import { QuitAppButton } from '@/features/quit'
import { DarkModeButton } from '@/features/darkmode'
import { HolidayButton } from '@/features/event'
import { MoveActiveButton } from '@/features/move'
import { EllipsisVertical } from 'lucide-react'

export function HeaderDropDown() {
    return (
        <DropDown trigger={<EllipsisVertical strokeWidth={1.5} size={24} />} align="right">
            <LoginButton />
            <MoveActiveButton />
            <OpacityButton />
            <DarkModeButton />
            <HolidayButton />
            <QuitAppButton />
        </DropDown>
    )
}
