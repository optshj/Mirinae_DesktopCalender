import React, { useState, InputHTMLAttributes, useEffect, useRef } from 'react'
import Hangul from 'hangul-js'
import { convertEngToKor } from '@/shared/lib/en2kr'

interface HangulInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
    value: string
    onChange: (newValue: string) => void
}
export default function HangulInput({ value, onChange, ...props }: HangulInputProps) {
    const [inputMode, setInputMode] = useState<'ko' | 'en'>('ko')
    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (props.autoFocus && inputRef.current) {
            inputRef.current.focus()
        }
    }, [props.autoFocus])

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        // 1. 한/영 모드 전환
        if (e.key === 'HangulMode' || (e.shiftKey && e.code === 'Space')) {
            e.preventDefault()
            setInputMode((prev) => (prev === 'ko' ? 'en' : 'ko'))
            return
        }

        // 2. 단축키 및 기능 키 무시
        if (e.ctrlKey || e.altKey || e.metaKey) {
            return
        }

        // 3. Backspace 처리
        if (e.key === 'Backspace') {
            e.preventDefault()
            let newValue = ''
            if (inputMode === 'ko' && value.length > 0) {
                const disassembled = Hangul.disassemble(value)
                newValue = Hangul.assemble(disassembled.slice(0, -1))
            } else if (inputMode === 'en' && value.length > 0) {
                newValue = value.slice(0, -1)
            }
            onChange(newValue)
            return
        }

        // 4. 입력 가능한 단일 문자 처리
        if (e.key.length === 1) {
            e.preventDefault()
            let newValue = value
            if (inputMode === 'ko' && e.key.match(/[a-zA-Z]/)) {
                const korChar = convertEngToKor(e.key)
                newValue = Hangul.assemble([...Hangul.disassemble(value), korChar])
            } else {
                newValue = value + e.key
            }
            onChange(newValue)
            return
        }
    }

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault()
        const pastedText = e.clipboardData.getData('text')
        onChange(value + pastedText)
    }

    return <input ref={inputRef} {...props} value={value} onKeyDown={handleKeyDown} onPaste={handlePaste} onChange={() => {}} autoComplete="off" />
}
