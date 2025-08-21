import { formatDate } from '@/shared/lib/dateFunction'
import { EventItemWithColor } from '@/shared/types/EventTypes'

interface FooterEventProps {
    items: EventItemWithColor[]
    title: string
    description: string
}
export function FooterEvent({ items, title, description }: FooterEventProps) {
    return (
        <section className="bg-primary flex-1 rounded-xl p-4">
            <h3 className="text-primary mb-4 text-base font-semibold">{title}</h3>
            <div className="flex flex-col gap-4">
                {items.length === 0 ? (
                    <span className="text-font-gray py-8 text-center">{description}</span>
                ) : (
                    items.slice(0, 2).map((event, i) => (
                        <div key={i} className="flex items-center gap-3 px-3">
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
