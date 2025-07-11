import { useEffect, useState } from 'react'

import { BsArrowsMove } from 'react-icons/bs'
import { IoMdMore } from 'react-icons/io'
import { LuFoldVertical } from 'react-icons/lu'
import { MdOutlineRefresh } from 'react-icons/md'

import LoginButton from '@/features/user/ui/LoginButton'
import DropDown from '@/shared/ui/DropDown'
import DarkModeButton from '@/features/darkmode/DarkModeButton'
import { useFlipCalendar } from '@/app/provider/FlipCalendar'

export default function Menu() {
    const [isDrag, setIsDrag] = useState(false)
    const [opacity, setOpacity] = useState(1.0)
    const { flipCalendar } = useFlipCalendar()

    const handleOpacityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newOpacity = parseFloat(e.target.value)
        setOpacity(newOpacity)
        window.api.setOpacity(newOpacity)
    }
    useEffect(() => {
        async function fetchOpacity() {
            const initialOpacity = await window.api.getInitialOpacity()
            setOpacity(initialOpacity)
        }
        fetchOpacity()
    }, [])
    return (
        <div className="text-primary flex items-center gap-4">
            <LuFoldVertical size={24} onClick={() => flipCalendar()} />
            <BsArrowsMove size={32} style={{ WebkitAppRegion: 'drag' } as any} className="p-1" />
            <MdOutlineRefresh size={24} onClick={() => window.api.safeReload()} />
            <DropDown trigger={<IoMdMore size={32} />} align="right">
                <LoginButton />
                {isDrag ? (
                    <div
                        onClick={() => {
                            setIsDrag(false)
                            window.api.stopDragging()
                        }}
                        className="cursor-pointer rounded px-2 py-1"
                    >
                        위치수정 종료
                    </div>
                ) : (
                    <div
                        onClick={() => {
                            setIsDrag(true)
                            window.api.startDragging()
                        }}
                        className="cursor-pointer rounded px-2 py-1"
                    >
                        위치수정 시작
                    </div>
                )}
                <div className="rounded px-2 py-1">
                    <label htmlFor="opacity-slider">투명도 조절</label>
                    <div className="flex items-center gap-2">
                        <input
                            id="opacity-slider"
                            type="range"
                            min="0.2"
                            max="1.0"
                            step="0.05"
                            value={opacity}
                            onChange={handleOpacityChange}
                            className="w-full"
                        />
                        <span className="text-xs font-semibold">{Math.round(opacity * 100)}%</span>
                    </div>
                </div>
                <div className="rounded px-2 py-1">
                    <label>다크모드</label>
                    <DarkModeButton />
                </div>

                <div onClick={() => window.api.quitApp()} className="cursor-pointer rounded px-2 py-1 text-red-600">
                    앱 종료
                </div>
            </DropDown>
        </div>
    )
}
