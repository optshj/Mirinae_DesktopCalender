import { useLogin } from '@/features/user/api/useLogin'
import { useGoogleCalendar } from '@/features/event/api/useGoogleCalendar'
import { EventItemWithColor } from '@/shared/types/EventTypes'
import { createContext, useContext } from 'react'
import { useShowHoliday } from './ShowHolidayContext'

export const CalendarItemsContext = createContext<{
    refresh: () => Promise<void>
    items: EventItemWithColor[] | null
}>({
    refresh: async () => {},
    items: null
})
export function CalendarItemsProvider({ children }: { children: React.ReactNode }) {
    const { tokens } = useLogin()
    const { isShow } = useShowHoliday()
    const { items, holidayItems, refresh, loading } = useGoogleCalendar(tokens.access_token)
    const handleRefresh = async () => {
        if (loading) return
        await refresh()
    }

    const mergedItems = isShow ? [...(holidayItems ?? []), ...(items ?? [])] : items
    return <CalendarItemsContext.Provider value={{ items: mergedItems, refresh: handleRefresh }}>{children}</CalendarItemsContext.Provider>
}

export const useCalendarItems = () => {
    const context = useContext(CalendarItemsContext)
    if (context === undefined) {
        throw new Error('useRefreshCalendar must be used within a RefreshCalendarProvider')
    }
    return context
}
