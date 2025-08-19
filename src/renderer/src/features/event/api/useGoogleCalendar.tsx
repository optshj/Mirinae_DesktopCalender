import { EventItem, EventItemWithColor } from '../../../shared/types/EventTypes'
import { getColorById } from '../lib/getColor'
import { useQuery, useQueryClient } from '@tanstack/react-query'

export function useGoogleCalendar(access_token: string) {
    const queryClient = useQueryClient()

    const { data: eventData, isLoading: eventLoading } = useQuery({
        queryKey: ['googleCalendarEvents'],
        queryFn: async () => {
            const res = await fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events?maxResults=2500', {
                headers: { Authorization: `Bearer ${access_token}` }
            }).then((res) => res.json())
            return res
        },
        enabled: !!access_token
    })

    const { data: holidayData, isLoading: holidayLoading } = useQuery({
        queryKey: ['googleCalendarHolidays'],
        queryFn: async () => {
            const res = await fetch('https://www.googleapis.com/calendar/v3/calendars/ko.south_korea%23holiday%40group.v.calendar.google.com/events?maxResults=2500', {
                headers: { Authorization: `Bearer ${access_token}` }
            }).then((res) => res.json())
            return res
        },
        enabled: !!access_token
    })

    const items: EventItemWithColor[] = (eventData?.items ?? []).map((event: EventItem) => {
        const color = getColorById(event.colorId)
        return { ...event, color }
    })

    const holidayItems: EventItemWithColor[] = (holidayData?.items ?? []).map((event: EventItem) => {
        const color = getColorById('10')
        return { ...event, color }
    })

    const refresh = async () => {
        await queryClient.invalidateQueries({ queryKey: ['googleCalendarEvents'] })
        await queryClient.invalidateQueries({ queryKey: ['googleCalendarHolidays'] })
    }

    return {
        items,
        holidayItems,
        refresh,
        loading: eventLoading || holidayLoading
    }
}
