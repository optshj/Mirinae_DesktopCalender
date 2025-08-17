import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { DeleteEventButton } from './DeleteEventButton'

const mockDeleteEvent = vi.fn()

vi.mock('../../api/useEditEvent', () => ({
    useEditEvent: () => ({
        deleteEvent: (id) => mockDeleteEvent(id)
    })
}))

function renderWithProvider(ui) {
    const queryClient = new QueryClient()
    return render(<QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>)
}

describe('DeleteEventButton', () => {
    beforeEach(() => {
        mockDeleteEvent.mockClear()
    })

    it('버튼을 렌더링한다.', () => {
        renderWithProvider(<DeleteEventButton eventId="1" />)
        const icon = screen.getByRole('button')
        expect(icon).toBeInTheDocument()
    })

    it('버튼을 누르면 이벤트 목록에서 이벤트를 삭제한다.', async () => {
        renderWithProvider(<DeleteEventButton eventId="123" />)
        const button = screen.getByRole('button')
        fireEvent.click(button)
        expect(mockDeleteEvent).toHaveBeenCalledWith('123')
    })
})
