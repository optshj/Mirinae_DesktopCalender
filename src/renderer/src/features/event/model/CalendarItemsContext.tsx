import { useLogin } from '@/features/user/api/useLogin'
import { useGoogleCalendar } from '@/features/event/api/useGoogleCalendar'
import { EventItemWithColor } from '@/shared/types/EventTypes'
import { createContext, useContext } from 'react'

export const CalendarItemsContext = createContext<{
    refresh: () => Promise<void>
    items: EventItemWithColor[] | null
    holidayItems: EventItemWithColor[] | null
}>({
    refresh: async () => {},
    items: null,
    holidayItems: null
})
export function CalendarItemsProvider({ children }: { children: React.ReactNode }) {
    const { tokens } = useLogin()
    const { items, holidayItems, refresh, loading } = useGoogleCalendar(tokens.access_token)

    const handleRefresh = async () => {
        if (loading) return
        await refresh()
    }

    return <CalendarItemsContext.Provider value={{ items, holidayItems, refresh: handleRefresh }}>{children}</CalendarItemsContext.Provider>
}

export const useCalendarItems = () => {
    const context = useContext(CalendarItemsContext)
    if (context === undefined) {
        throw new Error('useRefreshCalendar must be used within a RefreshCalendarProvider')
    }
    return context
}
