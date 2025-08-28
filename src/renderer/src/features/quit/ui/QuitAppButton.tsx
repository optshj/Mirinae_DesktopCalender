export function QuitAppButton() {
    return (
        <div onClick={() => window.api.quitApp()} className="text-red-600">
            앱 종료
        </div>
    )
}
