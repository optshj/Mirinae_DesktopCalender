import { useEffect, useState, useCallback } from 'react'
import { ColorType, EventItem, EventItemWithColor } from '../../../shared/types/EventTypes'

export function useGoogleCalendar(access_token: string) {
    const [items, setItems] = useState<EventItemWithColor[] | null>(null)
    const [colors, setColors] = useState<ColorType | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<Error | null>(null)

    const fetchAll = useCallback(async () => {
        setLoading(true)
        setError(null)
        try {
            const [eventRes, colorRes] = await Promise.all([
                fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events?maxResults=2500', {
                    method: 'GET',
                    headers: { Authorization: `Bearer ${access_token}` }
                }),
                fetch('https://www.googleapis.com/calendar/v3/colors', {
                    method: 'GET',
                    headers: { Authorization: `Bearer ${access_token}` }
                })
            ])
            const eventData = await eventRes.json()
            const colorData = await colorRes.json()

            setColors(colorData)

            const eventList: EventItemWithColor[] = (eventData.items || []).map((event: EventItem) => {
                const colorId = event.colorId || '1'
                const color = colorData?.event?.[colorId] || colorData?.event?.['1']
                return { ...event, color }
            })

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

    return { items, colors, loading, error, refresh: fetchAll }
}
