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
                        1. 일정 수정 기능이 추가되었습니다.
                        <br />
                        더블클릭 후 일정을 수정해보세요!
                        <br />
                        <br />
                        2. 일부 버튼이 의도치않게 작동하는 오류를 수정했습니다.
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}
