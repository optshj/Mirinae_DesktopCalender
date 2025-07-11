import { GoogleOAuthProvider } from '@react-oauth/google'
import { DarkModeProvider } from './DarkModeProvider'
import { CalendarItemsProvider } from './CalendarItemsProvider'
import { FlipCalendarProvider } from './FlipCalendarProvider'

const CLIENT_ID = import.meta.env.VITE_CLIENT_ID

export default function Provider({ children }: { children: React.ReactNode }) {
    return (
        <DarkModeProvider>
            <FlipCalendarProvider>
                <CalendarItemsProvider>
                    <GoogleOAuthProvider clientId={CLIENT_ID}>{children}</GoogleOAuthProvider>
                </CalendarItemsProvider>
            </FlipCalendarProvider>
        </DarkModeProvider>
    )
}
