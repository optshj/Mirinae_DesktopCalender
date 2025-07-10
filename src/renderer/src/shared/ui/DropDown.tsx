import { useRef, useState, useEffect } from 'react'

interface DropDownProps {
    trigger: React.ReactNode
    children: React.ReactNode
    align?: 'left' | 'right'
}

export default function DropDown({ trigger, children, align = 'left' }: DropDownProps) {
    const [open, setOpen] = useState(false)
    const menuRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setOpen(false)
            }
        }
        if (open) {
            document.addEventListener('mousedown', handleClickOutside)
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [open])

    return (
        <div className="relative inline-block" ref={menuRef}>
            <div onClick={() => setOpen((v) => !v)} className="cursor-pointer select-none">
                {trigger}
            </div>
            {open && (
                <div
                    className={`absolute z-50 mt-2 min-w-[160px] rounded-xl bg-white shadow-lg border border-gray-200 p-2 ${
                        align === 'right' ? 'right-0' : 'left-0'
                    }`}
                >
                    {children}
                </div>
            )}
        </div>
    )
}
