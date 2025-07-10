import { GoogleOAuthProvider } from '@react-oauth/google'
import { DarkModeProvider } from './DarkModeProvider'
import { CalendarItemsProvider } from './CalendarItems'

const CLIENT_ID = import.meta.env.VITE_CLIENT_ID
export default function Provider({ children }: { children: React.ReactNode }) {
    return (
        <DarkModeProvider>
            <CalendarItemsProvider>
                <GoogleOAuthProvider clientId={CLIENT_ID}>{children}</GoogleOAuthProvider>
            </CalendarItemsProvider>
        </DarkModeProvider>
    )
}
