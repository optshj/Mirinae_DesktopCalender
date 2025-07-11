import { formatDate, isSameDay } from '@/shared/lib/dateFunction'
import { EventItemWithColor } from '@/shared/types/EventTypes'
import { useMemo } from 'react'

export function TodayEvent({ items }: { items: EventItemWithColor[] | null }) {
    const todayOnly = useMemo(() => (items || []).filter((event) => isSameDay(new Date(), new Date(event.start.dateTime))), [items])

    return (
        <section className="border-bg-gray bg-primary flex-1 rounded-xl border p-4">
            <h3 className="text-primary mb-4 text-base font-semibold">오늘 일정</h3>
            <div className="flex flex-col gap-4">
                {todayOnly.length === 0 ? (
                    <div className="text-font-gray py-4 text-center">일정이 없습니다</div>
                ) : (
                    todayOnly.slice(0, 2).map((event, i) => (
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
