import { useEffect, useState, useCallback } from 'react'
import { ColorType, EventItem, EventItemWithColor } from '../types/google'

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
export function useEditEvent(access_token: string) {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<Error | null>(null)

    const addEvent = useCallback(
        async (date: Date, summary: string, colorId: string) => {
            const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
            const year = date.getFullYear()
            const month = date.getMonth() + 1
            const day = date.getDate()

            const monthStr = String(month).padStart(2, '0')
            const dayStr = String(day).padStart(2, '0')

            const localDateString = `${year}-${monthStr}-${dayStr}`

            const startTime = new Date(`${localDateString}T09:00`)
            const endTime = new Date(`${localDateString}T09:00`)
            const eventData = {
                summary: summary,
                start: {
                    dateTime: startTime.toISOString(),
                    timeZone: timeZone
                },
                end: {
                    dateTime: endTime.toISOString(),
                    timeZone: timeZone
                },
                colorId: colorId || '1'
            }
            setLoading(true)
            setError(null)

            try {
                const response = await fetch(`https://www.googleapis.com/calendar/v3/calendars/primary/events`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${access_token}`
                    },
                    body: JSON.stringify(eventData)
                })

                if (!response.ok) {
                    throw new Error('Failed to add event')
                }

                return await response.json()
            } catch (err: any) {
                setError(err)
            } finally {
                setLoading(false)
            }
        },
        [access_token]
    )

    const deleteEvent = useCallback(
        async (eventId: string) => {
            setLoading(true)
            setError(null)
            try {
                const response = await fetch(`https://www.googleapis.com/calendar/v3/calendars/primary/events/${eventId}`, {
                    method: 'DELETE',
                    headers: {
                        Authorization: `Bearer ${access_token}`
                    }
                })
                if (!response.ok) throw new Error('Failed to delete event')
                return true
            } catch (err: any) {
                setError(err)
                return false
            } finally {
                setLoading(false)
            }
        },
        [access_token]
    )

    return { addEvent, deleteEvent, loading, error }
}
