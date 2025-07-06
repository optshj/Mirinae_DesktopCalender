import { useLogin } from '@/shared/api/useLogin'
import { SlArrowLeft, SlArrowRight } from 'react-icons/sl'
import { BsArrowsMove } from 'react-icons/bs'
import { IoMdMore } from 'react-icons/io'
import { MdOutlineRefresh } from 'react-icons/md'
import { LuFoldVertical } from 'react-icons/lu'

import { useState } from 'react'
import DropDown from '@/widgets/DropDown'

interface CalendarHeaderProps {
    displayMonth: number
    year: number
    handlePrevMonth: () => void
    handleNextMonth: () => void
}
export default function CalendarHeader({ displayMonth, year, handlePrevMonth, handleNextMonth }: CalendarHeaderProps) {
    const { login, logout, tokens } = useLogin()
    const [isDrag, setIsDrag] = useState(false)

    return (
        <div className="border-bg-gray mb-2 flex w-full flex-row items-center justify-between rounded-xl border bg-white px-6 py-3">
            <div className="flex flex-row items-center gap-px">
                <div className="p-2">
                    <SlArrowLeft onClick={handlePrevMonth} />
                </div>
                <span className="text-font-black px-4 text-xl font-semibold">
                    {year}년 {displayMonth.toString().padStart(2, '0')}월
                </span>
                <div className="p-2">
                    <SlArrowRight onClick={handleNextMonth} />
                </div>
            </div>
            <div className="flex items-center gap-4">
                <LuFoldVertical size={24} color="#1F2937" />
                <BsArrowsMove size={32} color="#1F2937" style={{ WebkitAppRegion: 'drag' } as any} className="p-1" />
                <MdOutlineRefresh size={24} color="#1F2937" onClick={() => window.api.safeReload()} />
                <DropDown trigger={<IoMdMore size={32} color="#1F2937" />} align="right">
                    {tokens.access_token ? (
                        <div onClick={logout} className="cursor-pointer rounded px-2 py-1">
                            로그아웃
                        </div>
                    ) : (
                        <div onClick={login} className="cursor-pointer rounded px-2 py-1">
                            구글 로그인
                        </div>
                    )}
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
                    <div className="cursor-pointer rounded px-2 py-1">투명도</div>
                </DropDown>
            </div>
        </div>
    )
}
