import { useEffect, useState } from 'react'

export function OpacityButton() {
    const [opacity, setOpacity] = useState(1.0)
    useEffect(() => {
        async function fetchOpacity() {
            const initialOpacity = await window.api.getInitialOpacity()
            setOpacity(initialOpacity)
        }
        fetchOpacity()
    }, [])

    const handleOpacityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newOpacity = parseFloat(e.target.value)
        setOpacity(newOpacity)
        window.api.setOpacity(newOpacity)
    }
    return (
        <div className="rounded px-2 py-1">
            <label htmlFor="opacity-slider">투명도 조절</label>
            <div className="flex items-center gap-2">
                <input id="opacity-slider" type="range" min="0.2" max="1.0" step="0.05" value={opacity} onChange={handleOpacityChange} className="w-full" />
                <span className="text-xs font-semibold">{Math.round(opacity * 100)}%</span>
            </div>
        </div>
    )
}
