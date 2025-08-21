import { Slider } from '@/shared/ui/slider'
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

    return (
        <div className="rounded px-2 py-1">
            <label htmlFor="opacity-slider">투명도 조절</label>
            <div className="flex items-center gap-2">
                <Slider
                    defaultValue={[opacity]}
                    onValueChange={([value]) => {
                        setOpacity(value)
                        window.api.setOpacity(value)
                    }}
                    min={0.4}
                    max={1.0}
                    step={0.05}
                />
                <span className="text-xs font-semibold">{Math.round(opacity * 100)}%</span>
            </div>
        </div>
    )
}
