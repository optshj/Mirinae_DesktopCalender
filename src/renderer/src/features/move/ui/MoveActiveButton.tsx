import { Button } from '@/shared/ui/button'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/shared/ui/dialog'
import { useState } from 'react'

export function MoveActiveButton() {
    const [isDrag, setIsDrag] = useState(false)
    const toggleDrag = () => {
        setIsDrag((prev) => !prev)
        if (isDrag) {
            window.api.stopDragging()
            document.documentElement.classList.remove('resizable')
        } else {
            window.api.startDragging()
            document.documentElement.classList.add('resizable')
        }
    }

    return (
        <Dialog open={isDrag} onOpenChange={toggleDrag}>
            <DialogTrigger asChild>
                <div>{isDrag ? '화면조절 종료' : '화면조절 시작'}</div>
            </DialogTrigger>
            <DialogContent style={{ WebkitAppRegion: 'drag' } as any}>
                <DialogHeader>
                    <DialogTitle>화면조절</DialogTitle>
                    <DialogDescription>해당 화면을 잡고 드래그하여 위치를 조절할 수 있습니다.</DialogDescription>
                    <DialogDescription>화면의 테두리를 잡고 드래그하여 크기를 조절할 수 있습니다.</DialogDescription>
                    <DialogDescription>화면조절을 마치려면 아래 버튼을 클릭하세요.</DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose asChild style={{ WebkitAppRegion: 'no-drag' } as any}>
                        <Button type="button">적용</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
