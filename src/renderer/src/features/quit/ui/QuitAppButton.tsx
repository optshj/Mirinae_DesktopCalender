export function QuitAppButton() {
    return (
        <div onClick={() => window.api.quitApp()} className="px-2 py-1 text-red-600">
            앱 종료
        </div>
    )
}
