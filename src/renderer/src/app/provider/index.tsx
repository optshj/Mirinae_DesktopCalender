import { GoogleOAuthProvider } from '@react-oauth/google'
import { CalendarItemsProvider, ShowHolidayProvider } from '@/features/event'
import { FlipCalendarProvider } from '@/features/flip'

const CLIENT_ID = import.meta.env.VITE_CLIENT_ID

export default function Provider({ children }: { children: React.ReactNode }) {
    return (
        <ShowHolidayProvider>
            <FlipCalendarProvider>
                <CalendarItemsProvider>
                    <GoogleOAuthProvider clientId={CLIENT_ID}>{children}</GoogleOAuthProvider>
                </CalendarItemsProvider>
            </FlipCalendarProvider>
        </ShowHolidayProvider>
    )
}
