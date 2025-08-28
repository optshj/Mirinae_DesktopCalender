import DropDown from '@/shared/ui/DropDown'

import { LoginButton } from '@/features/user'
import { OpacityButton } from '@/features/opacity'
import { QuitAppButton } from '@/features/quit'
import { DarkModeButton } from '@/features/darkmode'
import { ColorFilterButton, HolidayButton } from '@/features/event'
import { MoveActiveButton } from '@/features/move'
import { EllipsisVertical } from 'lucide-react'

export function HeaderDropDown() {
    return (
        <DropDown trigger={<EllipsisVertical strokeWidth={1.5} size={32} />} align="right">
            <LoginButton />
            <MoveActiveButton />
            <OpacityButton />
            <DarkModeButton />
            <HolidayButton />
            {/* <ColorFilterButton /> */}
            <QuitAppButton />
        </DropDown>
    )
}
