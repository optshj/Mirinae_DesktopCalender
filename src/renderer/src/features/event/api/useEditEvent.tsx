import { useCallback, useRef, useState } from 'react'

export function useEditEvent(access_token: string) {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<Error | null>(null)
    const isSubmitting = useRef(false)

    const addEvent = useCallback(
        async (date: Date, startTime: string, endTime: string, summary: string, colorId: string) => {
            if (isSubmitting.current) return
            const [startHour, startMinute] = startTime.split(':').map(Number)
            const [endHour, endMinute] = endTime.split(':').map(Number)
            const startDateTime = new Date(date)
            const endDateTime = new Date(date)
            startDateTime.setHours(startHour, startMinute, 0, 0)
            endDateTime.setHours(endHour, endMinute, 0, 0)
            const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
            const eventData = {
                summary: summary,
                start: {
                    dateTime: startDateTime.toISOString(),
                    timeZone: timeZone
                },
                end: {
                    dateTime: endDateTime.toISOString(),
                    timeZone: timeZone
                },
                colorId: colorId || '1'
            }
            try {
                isSubmitting.current = true
                setLoading(true)
                setError(null)
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
                isSubmitting.current = false
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
