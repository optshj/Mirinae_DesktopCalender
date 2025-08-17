export function isSameDay(a: Date, b: Date) {
    return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()
}

// 예시: YYYY-MM-DD HH:mm 형식
export function formatDate(date: string) {
    const d = new Date(date)
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`
}

// 예시 8:00 AM
export function formatDateTIme(date: { date?: string; dateTime?: string; timeZone?: string }) {
    if (!date.dateTime) return null
    const d = new Date(date.dateTime)
    const formatter = new Intl.DateTimeFormat('en-US', {
        hour: 'numeric',
        minute: '2-digit', // 분 표시 (두 자리 / 예: 08:00)
        hour12: true, // 12시간제 AM/PM
        timeZone: date.timeZone || 'UTC' // 기본 timezone 처리
    })

    return formatter.format(d)
}
