import { Dialog, DialogContent, DialogTrigger } from '@/shared/ui/dialog'
import { getPalette } from '../../lib/getColor'

export function ColorFilterButton() {
    const palette = getPalette()
    return (
        <Dialog>
            <DialogTrigger asChild>
                <div className="flex flex-row justify-between">색상 카테고리 설정</div>
            </DialogTrigger>
            <DialogContent>
                <div className="grid grid-cols-6 gap-2 px-2">
                    {Object.entries(palette).map(([key, color]) => (
                        <div key={key} className="inline-block h-6 w-6 cursor-pointer rounded-full dark:saturate-70" style={{ backgroundColor: color.background }} />
                    ))}
                </div>
            </DialogContent>
        </Dialog>
    )
}
