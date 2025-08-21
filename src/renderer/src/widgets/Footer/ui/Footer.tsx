import { useMemo } from 'react'
import { FooterEvent } from '@/entities/event'
import { useCalendarItems } from '@/features/event'
import { isSameDay } from '@/shared/lib/dateFunction'

export function Footer() {
    const { items } = useCalendarItems()
    const tomorrow = new Date()
    tomorrow.setHours(0, 0, 0, 0)
    tomorrow.setDate(tomorrow.getDate() + 1)

    const upcomingEvent = useMemo(() => {
        return items.filter((event) => new Date(event.start.dateTime) >= tomorrow).sort((a, b) => new Date(a.start.dateTime).getTime() - new Date(b.start.dateTime).getTime())
    }, [items])

    const todayEvent = useMemo(
        () =>
            items.filter((item) => {
                if (!item.start.dateTime) return false
                return isSameDay(new Date(item.start.dateTime), new Date())
            }),
        [items]
    )

    const importantEvent = useMemo(() => {
        return items
            .filter((event) => new Date(event.start.dateTime) >= tomorrow)
            .filter((event) => event.colorId === '11') // 빨간색 일정만 중요한 일정으로 표시
            .sort((a, b) => new Date(a.start.dateTime).getTime() - new Date(b.start.dateTime).getTime())
    }, [items])

    return (
        <aside className="mt-2 flex h-48 flex-row gap-2">
            <FooterEvent items={todayEvent} title="오늘의 일정" description="오늘의 일정이 없습니다" />
            <FooterEvent items={upcomingEvent} title="다가오는 일정" description="다가오는 일정이 없습니다" />
            <FooterEvent items={importantEvent} title="중요한 일정" description="빨간색 일정이 표시됩니다" />
        </aside>
    )
}
