import { formatDate, isSameDay } from '@/shared/lib/dateFunction'
import { EventItemWithColor } from '@/shared/types/google'

interface FooterProps {
    todayEvents: EventItemWithColor[] | null
    quickLinks: any[]
}
export default function Footer({ todayEvents, quickLinks }: FooterProps) {
    const now = new Date()
    now.setHours(0, 0, 0, 0)
    now.setDate(now.getDate() + 1)

    const todayOnly = (todayEvents || []).filter((event) => isSameDay(new Date(), new Date(event.start.dateTime)))
    const upcoming = (todayEvents || [])
        .filter((event) => {
            const eventDate = new Date(event.start.dateTime)
            return eventDate > now
        })
        .sort((a, b) => new Date(a.start.dateTime).getTime() - new Date(b.start.dateTime).getTime())

    return (
        <aside className="flex flex-row gap-2 h-48 mt-2">
            <section className="p-4 bg-white rounded-xl border  border-bg-gray flex-1">
                <h3 className="mb-4 text-base font-semibold">오늘 일정</h3>
                <div className="flex flex-col gap-4">
                    {todayOnly.length === 0 ? (
                        <div className="text-font-gray text-center py-4">일정이 없습니다</div>
                    ) : (
                        todayOnly.slice(0, 2).map((event, i) => (
                            <div key={i} className="flex gap-3 items-center px-3 mb-1">
                                <span className="w-2 h-2 rounded-full" style={{ background: event.color.background }}></span>
                                <div className="flex flex-col">
                                    <span className="text-base font-semibold text-font-black">{event.summary}</span>
                                    <span className="text-sm text-font-gray">{formatDate(event.start.dateTime)}</span>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </section>
            <section className="p-4 bg-white rounded-xl border  border-bg-gray flex-1">
                <h3 className="mb-4 text-base font-semibold">다가오는 일정</h3>
                <div className="flex flex-col gap-4 h-full">
                    {upcoming.length === 0 ? (
                        <div className="text-font-gray text-center py-4">일정이 없습니다</div>
                    ) : (
                        upcoming.slice(0, 2).map((event, i) => (
                            <div key={i} className="flex gap-3 items-center px-3 mb-1">
                                <span className="w-2 h-2 rounded-full " style={{ background: event.color.background }}></span>
                                <div className="flex flex-col">
                                    <span className="text-base font-semibold text-font-black">{event.summary}</span>
                                    <span className="text-sm text-font-gray">{formatDate(event.start.dateTime)}</span>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </section>
            {/* 바로가기 */}
            <section className="p-4 bg-white rounded-xl border  border-bg-gray flex-1">
                <h3 className="mb-4 text-base font-semibold">바로가기</h3>
                <div className="flex flex-row gap-6">
                    {quickLinks.map((link, i) => (
                        <div key={i} className="flex flex-col gap-2 items-center p-4 rounded-xl ">
                            <img src={link.icon} alt={link.label} className="w-12 h-12 rounded-lg" />
                            <span className="text-base font-medium text-center text-font-black">{link.label}</span>
                        </div>
                    ))}
                </div>
            </section>
        </aside>
    )
}
