import { MdOutlineRefresh } from 'react-icons/md'

export function RefreshButton() {
    return <MdOutlineRefresh size={24} onClick={() => window.location.reload()} />
}
