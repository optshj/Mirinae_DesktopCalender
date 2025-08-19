// useEditEvent.test.tsx
import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useEditEvent } from './useEditEvent'

global.fetch = vi.fn()

function createWrapper() {
    const testQueryClient = new QueryClient({
        defaultOptions: {
            queries: {
                retry: false
            }
        }
    })
    return ({ children }: { children: React.ReactNode }) => <QueryClientProvider client={testQueryClient}>{children}</QueryClientProvider>
}

describe('useEditEvent Hook', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('새 이벤트 추가 성공', async () => {
        ;(global.fetch as any).mockResolvedValueOnce({
            ok: true,
            json: async () => ({ id: 'test-event-id', summary: 'Test Event' })
        })

        const { result } = renderHook(() => useEditEvent(), {
            wrapper: createWrapper()
        })

        await act(async () => {
            result.current.addEvent({
                date: new Date('2025-08-19'),
                startTime: '10:00',
                endTime: '11:00',
                summary: '테스트 일정',
                colorId: '2'
            })
        })

        expect(global.fetch).toHaveBeenCalledTimes(1)
        expect(global.fetch).toHaveBeenCalledWith(
            expect.stringContaining('https://www.googleapis.com/calendar/v3/calendars/primary/events'),
            expect.objectContaining({
                method: 'POST',
                headers: expect.objectContaining({ 'Content-Type': 'application/json' })
            })
        )
    })

    it('이벤트 삭제 성공', async () => {
        ;(global.fetch as any).mockResolvedValueOnce({ ok: true })

        const { result } = renderHook(() => useEditEvent(), {
            wrapper: createWrapper()
        })

        await act(async () => {
            result.current.deleteEvent('test-id-123')
        })

        expect(global.fetch).toHaveBeenCalledTimes(1)
        expect(global.fetch).toHaveBeenCalledWith('https://www.googleapis.com/calendar/v3/calendars/primary/events/test-id-123', expect.objectContaining({ method: 'DELETE' }))
    })
})
