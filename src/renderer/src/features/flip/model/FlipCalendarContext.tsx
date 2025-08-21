import { createContext, useContext, useState, ReactNode } from 'react'

export const FlipCalendarContext = createContext<{ isFlipCalendar: boolean; flipCalendar: () => void }>({ isFlipCalendar: false, flipCalendar: () => {} })

export function FlipCalendarProvider({ children }: { children: ReactNode }) {
    const [isFlipCalendar, setIsFlipCalendar] = useState(false)
    const flipCalendar = () => {
        setIsFlipCalendar(!isFlipCalendar)
    }

    return <FlipCalendarContext.Provider value={{ isFlipCalendar, flipCalendar }}>{children}</FlipCalendarContext.Provider>
}

export const useFlipCalendar = () => {
    const context = useContext(FlipCalendarContext)
    if (context === undefined) {
        throw new Error('useFlipCalendar must be used within a FlipCalendarProvider')
    }
    return context
}
