import { useMemo, useRef, useState } from 'react'

// 상단 상수 부
const TOTAL_MIN = 24 * 60 // 1440
const STEP_MIN = 5 // 5분
const STEPS = TOTAL_MIN / STEP_MIN // 288
const MAX_STEP = STEPS - 1 // 287 => 23:55

function stepToTime(step: number) {
    const minutes = step * STEP_MIN
    const h = Math.floor(minutes / 60)
    const m = minutes % 60
    return { hour: h, minute: m, label: `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}` }
}

interface DialLinearProps {
    updateForm: (key: keyof { startTime: string; endTime: string }, value: string) => void
    color: string
    width?: number
    height?: number
    padding?: number
}
export function DialLinear({ updateForm, color, width = 300, height = 64, padding = 16 }: DialLinearProps) {
    const svgRef = useRef<SVGSVGElement>(null)

    // 초기 스텝 계산 후 상한 클램프
    const initStep1 = Math.min(MAX_STEP, Math.round((120 / 360) * STEPS)) // ≈96
    const initStep2 = Math.min(MAX_STEP, Math.round((150 / 360) * STEPS)) // ≈120

    const [minStep, setMinStep] = useState(initStep1)
    const [maxStep, setMaxStep] = useState(initStep2)

    const trackX1 = padding
    const trackX2 = width - padding
    const trackY = height / 2
    const trackLen = trackX2 - trackX1

    const xFromStep = (s: number) => trackX1 + (s / MAX_STEP) * trackLen // 분모를 MAX_STEP로 두면 우측 끝이 정확히 23:55 위치
    const stepFromX = (x: number) => {
        const clamped = Math.min(trackX2, Math.max(trackX1, x))
        const ratio = (clamped - trackX1) / trackLen
        const raw = ratio * MAX_STEP
        return Math.min(MAX_STEP, Math.max(0, Math.round(raw)))
    }

    const minX = xFromStep(minStep)
    const maxX = xFromStep(maxStep)

    const selX = minX
    const selW = Math.max(0, maxX - minX)

    const start = useMemo(() => stepToTime(minStep), [minStep])
    const end = useMemo(() => stepToTime(maxStep), [maxStep])

    function eventToSvgX(e: PointerEvent) {
        const svg = svgRef.current
        if (!svg) return 0
        const pt = svg.createSVGPoint()
        pt.x = e.clientX
        pt.y = e.clientY
        const ctm = svg.getScreenCTM()
        if (!ctm) return 0
        const p = pt.matrixTransform(ctm.inverse())
        return p.x
    }

    function onDrag(which: 1 | 2, e: PointerEvent) {
        e.preventDefault()
        const x = eventToSvgX(e)
        const step = stepFromX(x) // 이미 0..MAX_STEP로 클램프

        if (which === 1) {
            const nextMin = Math.min(step, maxStep)
            setMinStep(nextMin)
            const t = stepToTime(nextMin)
            updateForm('startTime', `${t.hour}:${t.minute.toString().padStart(2, '0')}`)
        } else {
            const nextMax = Math.max(step, minStep)
            setMaxStep(nextMax)
            const t = stepToTime(nextMax)
            updateForm('endTime', `${t.hour}:${t.minute.toString().padStart(2, '0')}`)
        }
    }

    function bindDrag(which: 1 | 2) {
        return () => {
            const move = (ev: PointerEvent) => onDrag(which, ev)
            const up = () => {
                window.removeEventListener('pointermove', move)
                window.removeEventListener('pointerup', up)
                window.removeEventListener('pointercancel', up)
            }
            window.addEventListener('pointermove', move)
            window.addEventListener('pointerup', up)
            window.addEventListener('pointercancel', up)
        }
    }

    // 라벨용 스텝 계산도 MAX_STEP 기준으로
    const majorHours = [0, 6, 12, 18, 24]
    const marks = majorHours.map((h) => {
        const minutes = h * 60
        const step = Math.min(MAX_STEP, Math.round(minutes / STEP_MIN)) // 24시는 23:55 위치로 고정
        const x = xFromStep(step)
        return { h, x }
    })

    const evenHours = [2, 4, 8, 10, 14, 16, 20, 22].map((h) => {
        const step = Math.min(MAX_STEP, Math.round((h * 60) / STEP_MIN))
        return { h, x: xFromStep(step) }
    })

    return (
        <svg ref={svgRef} width={width} height={height} style={{ background: 'none', userSelect: 'none' }}>
            {/* 트랙 */}
            <line x1={trackX1} y1={trackY} x2={trackX2} y2={trackY} stroke="#E5E7EB" strokeWidth={12} strokeLinecap="round" />
            {/* 선택 구간 */}
            <rect x={selX} y={trackY - 6} width={selW} height={12} rx={6} fill={color} />

            {/* 주요 라벨 */}
            {marks.map((m) => (
                <g key={`major-${m.h}`}>
                    <line x1={m.x} y1={trackY - 12} x2={m.x} y2={trackY + 12} stroke="#CFCFCF" strokeWidth={m.h % 12 === 0 ? 2 : 1} />
                    <text x={m.x} y={trackY - 18} textAnchor="middle" fontSize="12" className="fill-primary">
                        {m.h.toString().padStart(2, '0')}
                    </text>
                </g>
            ))}

            {/* 짝수 시간 라벨 */}
            {evenHours.map((eh) => (
                <text key={`even-${eh.h}`} x={eh.x} y={trackY + 24} textAnchor="middle" fontSize="11" className="fill-primary">
                    {eh.h}
                </text>
            ))}

            {/* 시작 썸 */}
            <g>
                <circle
                    cx={minX}
                    cy={trackY}
                    r={14}
                    className="fill-[#fff] stroke-[#E6E8EC] dark:fill-[#424242] dark:stroke-zinc-700"
                    strokeWidth={3}
                    style={{ filter: 'drop-shadow(0px 2px 8px rgba(106,145,224,0.18))', cursor: 'pointer' }}
                    onPointerDown={bindDrag(1)}
                    // 접근성 예시(선택): role/aria-values
                    // role="slider" aria-orientation="horizontal" aria-valuemin={0} aria-valuemax={MAX_STEP} aria-valuenow={minStep}
                />
            </g>

            {/* 종료 썸 */}
            <g>
                <circle
                    cx={maxX}
                    cy={trackY}
                    r={14}
                    className="fill-[#fff] stroke-[#E6E8EC] dark:fill-[#424242] dark:stroke-zinc-700"
                    strokeWidth={3}
                    style={{ filter: 'drop-shadow(0px 2px 8px rgba(106,145,224,0.18))', cursor: 'pointer' }}
                    onPointerDown={bindDrag(2)}
                    // role="slider" aria-orientation="horizontal" aria-valuemin={0} aria-valuemax={MAX_STEP} aria-valuenow={maxStep}
                />
            </g>

            {/* 현재 선택 시간 라벨 */}
            <text x={minX} y={trackY - 32} textAnchor="middle" fontSize={11}>
                {start.label}
            </text>
            <text x={maxX} y={trackY - 32} textAnchor="middle" fontSize={11}>
                {end.label}
            </text>
        </svg>
    )
}
