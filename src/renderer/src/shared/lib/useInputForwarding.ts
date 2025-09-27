import { useEffect, useRef } from 'react'

export function useInputForwarding() {
    const timeoutRef = useRef<number | null>(null)
    const isEnabledRef = useRef(false)

    const enableInputForwarding = () => {
        if (!isEnabledRef.current) {
            window.api?.enableInputForwarding()
            isEnabledRef.current = true
        }
        
        // Clear existing timeout
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
        }
        
        // Set a timeout to disable input forwarding after inactivity
        timeoutRef.current = window.setTimeout(() => {
            disableInputForwarding()
        }, 5000) // 5 seconds of inactivity
    }

    const disableInputForwarding = () => {
        if (isEnabledRef.current) {
            window.api?.disableInputForwarding()
            isEnabledRef.current = false
        }
        
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
            timeoutRef.current = null
        }
    }

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current)
            }
            if (isEnabledRef.current) {
                window.api?.disableInputForwarding()
            }
        }
    }, [])

    return {
        enableInputForwarding,
        disableInputForwarding
    }
}