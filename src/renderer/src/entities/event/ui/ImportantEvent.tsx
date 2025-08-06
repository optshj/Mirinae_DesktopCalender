import { useMemo } from 'react'
import { formatDate } from '@/shared/lib/dateFunction'
import { EventItemWithColor } from '@/shared/types/EventTypes'

export function ImportantEvent({ items }: { items: EventItemWithColor[] | null }) {
    const upcoming = useMemo(() => {
        const tomorrow = new Date()
        tomorrow.setHours(0, 0, 0, 0)
        tomorrow.setDate(tomorrow.getDate() + 1)

        return (items || [])
            .filter((event) => new Date(event.start.dateTime) >= tomorrow)
            .filter((event) => event.colorId === '11') // 빨간색 일정만 중요한 일정으로 표시
            .sort((a, b) => new Date(a.start.dateTime).getTime() - new Date(b.start.dateTime).getTime())
    }, [items])
    return (
        <section className="border-bg-gray bg-primary flex-1 rounded-xl border p-4">
            <h3 className="text-primary mb-4 text-base font-semibold">중요한 일정</h3>
            <div className="flex h-full flex-col gap-4">
                {upcoming.length === 0 ? (
                    <div className="text-font-gray py-4 text-center">빨간색 일정이 나타납니다</div>
                ) : (
                    upcoming.slice(0, 2).map((event, i) => (
                        <div key={i} className="mb-1 flex items-center gap-3 px-3">
                            <span className="h-2 w-2 rounded-full" style={{ background: event.color.background }}></span>
                            <div className="flex flex-col">
                                <span className="text-primary text-base font-semibold">{event.summary}</span>
                                <span className="text-font-gray text-sm">{formatDate(event.start.dateTime)}</span>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </section>
    )
}
