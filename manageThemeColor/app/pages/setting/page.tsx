

export default function SettingPage() {
  return (

    <>
      {/* Header Section */}
      <div className="flex flex-col gap-4">
        {/* Page Title Skeleton */}
        <div className="h-10 w-64 bg-zinc-300 dark:bg-zinc-700 rounded-md"></div>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col lg:flex-row gap-6">

        {/* Left Settings Sidebar Skeleton */}
        <div className="w-full lg:w-72 flex-shrink-0 bg-white dark:bg-zinc-900 rounded-2xl shadow-sm p-4 flex flex-col gap-6 h-fit">
          {/* Group 1 */}
          <div className="flex flex-col gap-3">
            {/* Section Title */}
            <div className="h-3 w-24 bg-zinc-200 dark:bg-zinc-800 rounded"></div>
            {/* Menu Items */}
            <div className="h-12 w-full bg-zinc-100 dark:bg-zinc-800/80 rounded-xl border border-zinc-200 dark:border-zinc-700"></div>
            <div className="h-10 w-full bg-zinc-100 dark:bg-zinc-800/50 rounded-xl"></div>
            <div className="h-10 w-full bg-zinc-100 dark:bg-zinc-800/50 rounded-xl"></div>
            <div className="h-10 w-full bg-zinc-100 dark:bg-zinc-800/50 rounded-xl"></div>
            <div className="h-10 w-full bg-zinc-100 dark:bg-zinc-800/50 rounded-xl"></div>
          </div>

          {/* Group 2 */}
          <div className="flex flex-col gap-3">
            {/* Section Title */}
            <div className="h-3 w-16 bg-zinc-200 dark:bg-zinc-800 rounded"></div>
            {/* Menu Items */}
            <div className="h-10 w-full bg-zinc-100 dark:bg-zinc-800/50 rounded-xl"></div>
            <div className="h-10 w-full bg-zinc-100 dark:bg-zinc-800/50 rounded-xl"></div>
            <div className="h-10 w-full bg-zinc-100 dark:bg-zinc-800/50 rounded-xl"></div>
          </div>
        </div>

        {/* Right Content Skeleton (Table area) */}
        <div className="flex-1 bg-white dark:bg-zinc-900 rounded-2xl shadow-sm p-6 relative min-h-[500px] flex flex-col">

          {/* Floating Add Button */}
          <div className="absolute top-6 right-6 h-14 w-14 bg-zinc-300 dark:bg-zinc-700 rounded-full shadow-md z-10 border-4 border-white dark:border-zinc-900"></div>

          {/* Table Area */}
          <div className="mt-16 flex flex-col gap-2">
            {/* Table Header */}
            <div className="h-12 w-full bg-zinc-200 dark:bg-zinc-800 rounded-lg flex items-center px-4 gap-4">
              <div className="h-4 w-1/4 bg-zinc-300 dark:bg-zinc-700 rounded"></div>
              <div className="h-4 w-1/4 bg-zinc-300 dark:bg-zinc-700 rounded"></div>
              <div className="h-4 w-1/4 bg-zinc-300 dark:bg-zinc-700 rounded"></div>
              <div className="flex w-1/4 justify-end">
                <div className="h-4 w-16 bg-zinc-300 dark:bg-zinc-700 rounded"></div>
              </div>
            </div>

            {/* Table Rows */}
            {[1, 2, 3, 4, 5, 6].map((row) => (
              <div key={row} className="h-12 w-full bg-zinc-50 dark:bg-zinc-800/30 rounded-lg flex items-center px-4 gap-4">
                <div className="h-3 w-1/4 bg-zinc-200 dark:bg-zinc-700/50 rounded"></div>
                <div className="h-3 w-1/4 bg-zinc-200 dark:bg-zinc-700/50 rounded"></div>
                <div className="h-3 w-1/4 bg-zinc-200 dark:bg-zinc-700/50 rounded"></div>
                <div className="flex w-1/4 gap-2 justify-end">
                  <div className="h-6 w-6 bg-zinc-200 dark:bg-zinc-700 rounded-md"></div>
                  <div className="h-6 w-6 bg-zinc-200 dark:bg-zinc-700 rounded-md"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </>



  );
}
