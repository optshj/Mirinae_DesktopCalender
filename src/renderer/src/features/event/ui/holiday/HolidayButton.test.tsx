import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { HolidayButton } from './HolidayButton'

const mockHandleShow = vi.fn()
let mockIsShow = false

vi.mock('../../model/ShowHolidayContext', () => ({
    useShowHoliday: () => ({
        isShow: mockIsShow,
        handleShow: mockHandleShow
    })
}))

describe('HolidayButton', () => {
    beforeEach(() => {
        mockHandleShow.mockClear()
    })

    it('초기 렌더링 시 Off 상태이다', () => {
        mockIsShow = false
        render(<HolidayButton />)
        expect(screen.getByText('Off')).toBeInTheDocument()
    })

    it('isShow가 true이면 On 상태이다', () => {
        mockIsShow = true
        render(<HolidayButton />)
        expect(screen.getByText('On')).toBeInTheDocument()
    })

    it('버튼 클릭 시 handleShow 함수가 호출된다', () => {
        mockIsShow = false
        render(<HolidayButton />)
        const button = screen.getByRole('button')
        fireEvent.click(button)
        expect(mockHandleShow).toHaveBeenCalledTimes(1)
    })
})
