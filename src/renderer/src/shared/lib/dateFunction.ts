export function isSameDay(a: Date, b: Date) {
    return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()
}

// 예시: YYYY-MM-DD HH:mm 형식
export function formatDate(date: string) {
    const d = new Date(date)
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`
}

// 예시 8 AM
export function formatDateTIme(date: string) {
    const d = new Date(date)
    const formatter = new Intl.DateTimeFormat('en-US', {
        hour: 'numeric',
        hour12: true
    })
    return formatter.format(d)
}
