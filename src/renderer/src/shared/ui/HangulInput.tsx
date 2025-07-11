import React, { useState, InputHTMLAttributes, useEffect, useRef } from 'react'
import Hangul from 'hangul-js'
import { convertEngToKor } from '../lib/en2kr'

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
        if (e.key === 'HangulMode' || (e.shiftKey && e.code === 'Space')) {
            e.preventDefault()
            setInputMode((prev) => (prev === 'ko' ? 'en' : 'ko'))
            return
        }

        if (e.ctrlKey || e.altKey || e.metaKey) {
            return
        }

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

    return (
        <div className="relative flex w-full items-center">
            <input ref={inputRef} {...props} value={value} onKeyDown={handleKeyDown} onPaste={handlePaste} onChange={() => {}} autoComplete="off" />
            <div
                className={`absolute right-3 text-sm font-bold transition-colors select-none ${inputMode === 'ko' ? 'text-main-color' : 'text-zinc-400'}`}
                style={{ pointerEvents: 'none' }}
            >
                {inputMode === 'ko' ? '한' : '영'}
            </div>
        </div>
    )
}
