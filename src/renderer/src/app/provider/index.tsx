import { GoogleOAuthProvider } from '@react-oauth/google'
import { CalendarItemsProvider, ShowHolidayProvider } from '@/features/event'
import { FlipCalendarProvider } from '@/features/flip'
import { ReactQueryProvider } from './QueryClient'

const CLIENT_ID = import.meta.env.VITE_CLIENT_ID

export default function Provider({ children }: { children: React.ReactNode }) {
    return (
        <ReactQueryProvider>
            <ShowHolidayProvider>
                <FlipCalendarProvider>
                    <CalendarItemsProvider>
                        <GoogleOAuthProvider clientId={CLIENT_ID}>{children}</GoogleOAuthProvider>
                    </CalendarItemsProvider>
                </FlipCalendarProvider>
            </ShowHolidayProvider>
        </ReactQueryProvider>
    )
}
