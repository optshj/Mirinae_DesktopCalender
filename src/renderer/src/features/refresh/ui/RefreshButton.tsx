import { RotateCw } from 'lucide-react'

export function RefreshButton() {
    return <RotateCw size={24} onClick={() => window.location.reload()} />
}
