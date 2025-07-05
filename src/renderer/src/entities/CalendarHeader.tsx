import { useLogin } from '@/shared/api/useLogin'
import { SlArrowLeft, SlArrowRight } from 'react-icons/sl'
import { BsArrowsMove } from 'react-icons/bs'
import { IoMdMore } from 'react-icons/io'
import { MdOutlineRefresh } from 'react-icons/md'
import { LuFoldVertical } from 'react-icons/lu'

import DropDown from '@/widgets/DropDown'

interface CalendarHeaderProps {
    displayMonth: number
    year: number
    handlePrevMonth: () => void
    handleNextMonth: () => void
}
export default function CalendarHeader({ displayMonth, year, handlePrevMonth, handleNextMonth }: CalendarHeaderProps) {
    const { login, logout, tokens } = useLogin()

    return (
        <div className="flex flex-row items-center justify-between px-6 py-3 mb-2 w-full rounded-xl border bg-white border-bg-gray">
            <div className="flex flex-row items-center gap-px">
                <div className="p-2">
                    <SlArrowLeft onClick={handlePrevMonth} />
                </div>
                <span className="text-xl font-semibold text-font-black px-4">
                    {year}년 {displayMonth.toString().padStart(2, '0')}월
                </span>
                <div className="p-2">
                    <SlArrowRight onClick={handleNextMonth} />
                </div>
            </div>
            <div className="flex gap-4 items-center">
                <LuFoldVertical size={24} color="#1F2937" />
                <BsArrowsMove size={32} color="#1F2937" style={{ WebkitAppRegion: 'drag' } as any} className="p-1" />
                <MdOutlineRefresh size={24} color="#1F2937" onClick={() => window.location.reload()} />
                <DropDown trigger={<IoMdMore size={32} color="#1F2937" />} align="right">
                    {tokens.access_token ? (
                        <div onClick={logout} className="py-1 px-2 hover:bg-gray-100 rounded cursor-pointer">
                            로그아웃
                        </div>
                    ) : (
                        <div onClick={login} className="py-1 px-2 hover:bg-gray-100 rounded cursor-pointer">
                            구글 로그인
                        </div>
                    )}
                    <div className="py-1 px-2 hover:bg-gray-100 rounded cursor-pointer">투명도</div>
                </DropDown>
            </div>
        </div>
    )
}
