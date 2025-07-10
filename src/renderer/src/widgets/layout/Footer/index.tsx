import { EventItemWithColor } from '@/shared/types/google'
import TodayEvent from './TodayEvent'
import UpcomingEvent from './UpcomingEvent'
import QuickLink from './QuickLink'

interface FooterProps {
    todayEvents: EventItemWithColor[] | null
    quickLinks: any[]
}
export default function Footer({ todayEvents, quickLinks }: FooterProps) {
    return (
        <aside className="mt-2 flex h-48 flex-row gap-2">
            <TodayEvent items={todayEvents} />
            <UpcomingEvent items={todayEvents} />
            <QuickLink items={quickLinks} />
        </aside>
    )
}
