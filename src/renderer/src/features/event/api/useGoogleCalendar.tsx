import { useEffect, useState, useCallback } from 'react'
import { EventItem, EventItemWithColor } from '../../../shared/types/EventTypes'
import { getColorById } from '../utils/getColor'

export function useGoogleCalendar(access_token: string) {
    const [items, setItems] = useState<EventItemWithColor[] | null>(null)
    const [holidayItems, setHolidayItems] = useState<EventItemWithColor[] | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<Error | null>(null)

    const fetchAll = useCallback(async () => {
        setLoading(true)
        setError(null)
        try {
            const [eventRes, holidays] = await Promise.all([
                fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events?maxResults=2500', {
                    method: 'GET',
                    headers: { Authorization: `Bearer ${access_token}` }
                }),
                fetch(' https://www.googleapis.com/calendar/v3/calendars/ko.south_korea%23holiday%40group.v.calendar.google.com/events?maxResults=2500', {
                    method: 'GET',
                    headers: { Authorization: `Bearer ${access_token}` }
                })
            ])
            const eventData = await eventRes.json()
            const holidayData = await holidays.json()

            const eventList: EventItemWithColor[] = (eventData.items || []).map((event: EventItem) => {
                const color = getColorById(event.colorId)
                return { ...event, color }
            })
            const holidayList: EventItemWithColor[] = (holidayData.items || []).map((event: EventItem) => {
                const color = getColorById('10') // green color for holidays
                return { ...event, color }
            })
            setHolidayItems(holidayList)
            setItems(eventList)
        } catch (err: any) {
            setError(err)
        } finally {
            setLoading(false)
        }
    }, [access_token])

    useEffect(() => {
        if (access_token) fetchAll()
    }, [access_token, fetchAll])

    return { items, holidayItems, loading, error, refresh: fetchAll }
}
