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
            <div onClick={() => setOpen((v) => !v)}>{trigger}</div>
            <div
                className={`bg-primary absolute z-50 mt-2 min-w-[160px] rounded-xl p-2 shadow-lg ${align === 'right' ? 'right-0' : 'left-0'} ${open ? 'block' : 'hidden'}`}
            >
                {children}
            </div>
        </div>
    )
}
