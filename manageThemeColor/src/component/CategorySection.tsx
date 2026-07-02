export default function CategorySection() {
    return (
        <div className="w-full lg:w-[320px] flex-shrink-0 bg-white dark:bg-zinc-900 rounded-2xl shadow-sm p-4 lg:p-6 flex flex-col gap-4 lg:gap-6 h-auto lg:h-[calc(100vh-12rem)]">
            {/* Section Title */}
            <div className="h-4 w-28 bg-zinc-300 dark:bg-zinc-700 rounded-md flex-shrink-0"></div>

            {/* Categories Grid / Horizontal Scroll */}
            <div className="flex overflow-x-auto lg:grid lg:grid-cols-2 gap-4 lg:overflow-y-auto lg:overflow-x-hidden pb-2 lg:pb-0 pr-2 custom-scrollbar">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                    <div key={item} className="h-24 lg:h-28 min-w-[110px] lg:w-full flex-shrink-0 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col items-center justify-center gap-3 cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">
                        <div className="h-8 lg:h-10 w-8 lg:w-10 bg-zinc-200 dark:bg-zinc-800 rounded-md"></div>
                        <div className="h-2 lg:h-3 w-14 lg:w-16 bg-zinc-200 dark:bg-zinc-700 rounded-sm"></div>
                    </div>
                ))}
            </div>
        </div>
    );
}