import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/shared/ui/dialog'
import { useEffect, useState } from 'react'

export function PatchNoteModal() {
    const [isOpen, setIsOpen] = useState(false)
    useEffect(() => {
        const cleanup = window.api.onShowPatchNotes(() => {
            setIsOpen(true)
        })
        return cleanup
    }, [])

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>새롭게 변경된 기능</DialogTitle>
                    <DialogDescription>
                        1. 자잘한 오류들이 수정되었습니다.
                        <br />그 외에는 달라진게 없어요!
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}
