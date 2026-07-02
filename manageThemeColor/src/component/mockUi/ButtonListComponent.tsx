export default function ButtonListComponent() {
    return (
        <div className="flex flex-col gap-4 h-[250px] justify-start py-4">
            <div className="h-12 bg-white dark:bg-zinc-900 rounded-xl shadow-sm w-full"></div>
            <div className="h-12 bg-zinc-200 dark:bg-zinc-800 rounded-xl shadow-sm w-full"></div>
            <div className="h-12 bg-white dark:bg-zinc-900 border-2 border-zinc-200 dark:border-zinc-700 rounded-xl w-full"></div>
            <div className="h-12 bg-zinc-200 dark:bg-zinc-800 opacity-50 rounded-xl w-full"></div>
        </div>
    )
}