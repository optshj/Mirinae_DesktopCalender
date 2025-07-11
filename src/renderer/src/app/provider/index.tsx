import { GoogleOAuthProvider } from '@react-oauth/google'
import { CalendarItemsProvider } from '@/features/calendar'
import { DarkModeProvider } from '@/features/darkmode'
import { FlipCalendarProvider } from '@/features/flip'

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
