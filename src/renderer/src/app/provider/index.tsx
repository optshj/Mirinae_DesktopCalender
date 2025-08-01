import { GoogleOAuthProvider } from '@react-oauth/google'
import { CalendarItemsProvider, ShowHolidayProvider } from '@/features/event'
import { DarkModeProvider } from '@/features/darkmode'
import { FlipCalendarProvider } from '@/features/flip'
import { UserProvider } from '@/features/user'

const CLIENT_ID = import.meta.env.VITE_CLIENT_ID

export default function Provider({ children }: { children: React.ReactNode }) {
    return (
        <UserProvider>
            <DarkModeProvider>
                <FlipCalendarProvider>
                    <CalendarItemsProvider>
                        <ShowHolidayProvider>
                            <GoogleOAuthProvider clientId={CLIENT_ID}>{children}</GoogleOAuthProvider>
                        </ShowHolidayProvider>
                    </CalendarItemsProvider>
                </FlipCalendarProvider>
            </DarkModeProvider>
        </UserProvider>
    )
}
