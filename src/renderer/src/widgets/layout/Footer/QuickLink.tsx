export default function QuickLink({ items }: { items: any }) {
    return (
        <section className="border-bg-gray flex-1 rounded-xl border bg-white p-4">
            <h3 className="mb-4 text-base font-semibold">바로가기</h3>
            <div className="flex flex-row gap-6">
                {items.map((link, i) => (
                    <div key={i} className="flex flex-col items-center gap-2 rounded-xl p-4">
                        <img src={link.icon} alt={link.label} className="h-12 w-12 rounded-lg" />
                        <span className="text-font-black text-center text-base font-medium">{link.label}</span>
                    </div>
                ))}
            </div>
        </section>
    )
}
