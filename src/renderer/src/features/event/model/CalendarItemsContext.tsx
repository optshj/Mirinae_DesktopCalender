import { createContext, useContext } from 'react'
import { useGoogleCalendar } from '@/features/event/api/useGoogleCalendar'
import { EventItemWithColor } from '@/shared/types/EventTypes'

export const CalendarItemsContext = createContext<{
    items: EventItemWithColor[]
}>({
    items: []
})
export function CalendarItemsProvider({ children }: { children: React.ReactNode }) {
    const { items } = useGoogleCalendar()
    return <CalendarItemsContext.Provider value={{ items }}>{children}</CalendarItemsContext.Provider>
}

export const useCalendarItems = () => {
    const context = useContext(CalendarItemsContext)
    if (context === undefined) {
        throw new Error('useRefreshCalendar must be used within a RefreshCalendarProvider')
    }
    return context
}
