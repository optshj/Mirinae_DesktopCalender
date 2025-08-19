import { Calendar } from '@/pages'
import Provider from './provider'
import { Toaster } from '@/shared/ui/sonner'

export default function App() {
    return (
        <>
            <Provider>
                <Calendar />
                <Toaster position="top-center" richColors />
            </Provider>
        </>
    )
}
