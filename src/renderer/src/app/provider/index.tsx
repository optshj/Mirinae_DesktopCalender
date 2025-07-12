import { GoogleOAuthProvider } from '@react-oauth/google'
import { CalendarItemsProvider, ShowHolidayProvider } from '@/features/event'
import { DarkModeProvider } from '@/features/darkmode'
import { FlipCalendarProvider } from '@/features/flip'

const CLIENT_ID = import.meta.env.VITE_CLIENT_ID

export default function Provider({ children }: { children: React.ReactNode }) {
    return (
        <DarkModeProvider>
            <FlipCalendarProvider>
                <CalendarItemsProvider>
                    <ShowHolidayProvider>
                        <GoogleOAuthProvider clientId={CLIENT_ID}>{children}</GoogleOAuthProvider>
                    </ShowHolidayProvider>
                </CalendarItemsProvider>
            </FlipCalendarProvider>
        </DarkModeProvider>
    )
}
