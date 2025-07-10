import { GoogleOAuthProvider } from '@react-oauth/google'
import { DarkModeProvider } from './DarkModeProvider'

const CLIENT_ID = import.meta.env.VITE_CLIENT_ID
export default function Provider({ children }: { children: React.ReactNode }) {
    return (
        <DarkModeProvider>
            <GoogleOAuthProvider clientId={CLIENT_ID}>{children}</GoogleOAuthProvider>
        </DarkModeProvider>
    )
}
