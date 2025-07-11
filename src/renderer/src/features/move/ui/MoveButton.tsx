import { BsArrowsMove } from 'react-icons/bs'

export function MoveButton() {
    return <BsArrowsMove size={32} style={{ WebkitAppRegion: 'drag' } as any} className="p-1" />
}
