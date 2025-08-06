import ReactDOM from 'react-dom'
import { useEffect } from 'react'
import { IoCloseOutline } from 'react-icons/io5'

export default function Modal({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
    const portalElement = document.getElementById('modal')
    if (!portalElement) return null
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose()
            }
        }
        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [onClose])

    return ReactDOM.createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center" onClick={onClose}>
            <div className="bg-layer relative min-w-[300px] rounded-xl p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
                <button className="text-primary absolute top-4 right-4 cursor-pointer rounded-full" onClick={onClose}>
                    <IoCloseOutline size={32} />
                </button>
                {children}
            </div>
        </div>,
        portalElement
    )
}
