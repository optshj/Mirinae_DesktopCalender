import { GoogleOAuthProvider } from '@react-oauth/google'

const CLIENT_ID = import.meta.env.VITE_CLIENT_ID
export default function Provider({ children }: { children: React.ReactNode }) {
    return <GoogleOAuthProvider clientId={CLIENT_ID}>{children}</GoogleOAuthProvider>
}
