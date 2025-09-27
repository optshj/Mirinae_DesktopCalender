import { renderHook, act } from '@testing-library/react'
import { useInputForwarding } from './useInputForwarding'

// Mock the window.api
const mockEnableInputForwarding = jest.fn()
const mockDisableInputForwarding = jest.fn()

Object.defineProperty(window, 'api', {
    value: {
        enableInputForwarding: mockEnableInputForwarding,
        disableInputForwarding: mockDisableInputForwarding,
    },
    writable: true,
})

describe('useInputForwarding', () => {
    beforeEach(() => {
        jest.clearAllMocks()
        jest.useFakeTimers()
    })

    afterEach(() => {
        jest.useRealTimers()
    })

    it('should enable input forwarding when enableInputForwarding is called', () => {
        const { result } = renderHook(() => useInputForwarding())

        act(() => {
            result.current.enableInputForwarding()
        })

        expect(mockEnableInputForwarding).toHaveBeenCalledTimes(1)
    })

    it('should disable input forwarding after timeout', () => {
        const { result } = renderHook(() => useInputForwarding())

        act(() => {
            result.current.enableInputForwarding()
        })

        expect(mockEnableInputForwarding).toHaveBeenCalledTimes(1)

        // Fast-forward time by 5 seconds
        act(() => {
            jest.advanceTimersByTime(5000)
        })

        expect(mockDisableInputForwarding).toHaveBeenCalledTimes(1)
    })

    it('should not enable input forwarding multiple times', () => {
        const { result } = renderHook(() => useInputForwarding())

        act(() => {
            result.current.enableInputForwarding()
            result.current.enableInputForwarding()
        })

        expect(mockEnableInputForwarding).toHaveBeenCalledTimes(1)
    })

    it('should reset timeout when enableInputForwarding is called again', () => {
        const { result } = renderHook(() => useInputForwarding())

        act(() => {
            result.current.enableInputForwarding()
        })

        // Advance time by 3 seconds
        act(() => {
            jest.advanceTimersByTime(3000)
        })

        // Enable again, should reset the timeout
        act(() => {
            result.current.enableInputForwarding()
        })

        // Advance time by 3 more seconds (total 6 seconds from first call, but only 3 from second call)
        act(() => {
            jest.advanceTimersByTime(3000)
        })

        // Should not have been disabled yet
        expect(mockDisableInputForwarding).not.toHaveBeenCalled()

        // Advance by 2 more seconds to complete the 5-second timeout from the second call
        act(() => {
            jest.advanceTimersByTime(2000)
        })

        expect(mockDisableInputForwarding).toHaveBeenCalledTimes(1)
    })

    it('should disable input forwarding manually', () => {
        const { result } = renderHook(() => useInputForwarding())

        act(() => {
            result.current.enableInputForwarding()
            result.current.disableInputForwarding()
        })

        expect(mockDisableInputForwarding).toHaveBeenCalledTimes(1)
    })

    it('should cleanup on unmount', () => {
        const { result, unmount } = renderHook(() => useInputForwarding())

        act(() => {
            result.current.enableInputForwarding()
        })

        expect(mockEnableInputForwarding).toHaveBeenCalledTimes(1)

        unmount()

        expect(mockDisableInputForwarding).toHaveBeenCalledTimes(1)
    })
})