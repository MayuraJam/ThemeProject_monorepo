"use client";
import CategorySection from '@/src/component/CategorySection';
import { Header } from '@/src/component/atom/Header';
import { useState } from 'react';

export default function ManageThemeListPage() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <>
      {/* Header Section */}
      <div className="flex flex-col">
        {/* Page Title Skeleton */}
        <Header title="Manage Theme List" />
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col lg:flex-row gap-6">

        <CategorySection />

        {/* Right Column: Theme List Skeleton */}
        <div className="flex-1 bg-white dark:bg-zinc-900 rounded-2xl shadow-sm p-6 flex flex-col gap-6 h-[calc(100vh-12rem)]">

          {/* Tabs */}
          <div className="flex border-b border-zinc-200 dark:border-zinc-800 flex-shrink-0">
            <button
              onClick={() => setActiveTab(0)}
              className={`flex-1 flex justify-center pb-3 border-b-2 transition-colors cursor-pointer ${activeTab === 0 ? 'border-zinc-400 dark:border-zinc-500' : 'border-transparent hover:border-zinc-300 dark:hover:border-zinc-700'}`}
            >
              <div className={`h-4 w-16 rounded-sm transition-colors ${activeTab === 0 ? 'bg-zinc-400 dark:bg-zinc-600' : 'bg-zinc-200 dark:bg-zinc-800'}`}></div>
            </button>
            <button
              onClick={() => setActiveTab(1)}
              className={`flex-1 flex justify-center pb-3 border-b-2 transition-colors cursor-pointer ${activeTab === 1 ? 'border-zinc-400 dark:border-zinc-500' : 'border-transparent hover:border-zinc-300 dark:hover:border-zinc-700'}`}
            >
              <div className={`h-4 w-16 rounded-sm transition-colors ${activeTab === 1 ? 'bg-zinc-400 dark:bg-zinc-600' : 'bg-zinc-200 dark:bg-zinc-800'}`}></div>
            </button>
          </div>

          {/* Theme Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 pt-4 overflow-y-auto pr-2 pb-16 relative">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
              <div key={item} className="flex flex-col gap-3 relative cursor-pointer group">
                {/* Color Palette Dummy */}
                <div className="h-44 w-full rounded-xl overflow-hidden flex flex-col shadow-sm border border-zinc-100 dark:border-zinc-800 group-hover:shadow-md transition-shadow">
                  {/* Modify color slightly if Dark tab is active just to show a difference */}
                  <div className={`flex-[2] w-full transition-colors ${activeTab === 1 ? 'bg-zinc-800 dark:bg-zinc-950' : 'bg-zinc-900 dark:bg-black'}`}></div>
                  <div className="flex-1 bg-zinc-600 dark:bg-zinc-700 w-full"></div>
                  <div className="flex-1 bg-zinc-300 dark:bg-zinc-400 w-full"></div>
                  <div className={`flex-1 w-full transition-colors ${activeTab === 1 ? 'bg-indigo-400 dark:bg-indigo-500' : 'bg-sky-400 dark:bg-sky-500'}`}></div>
                </div>
                {/* Theme Title & Actions */}
                <div className="flex justify-between items-center px-1">
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 bg-zinc-300 dark:bg-zinc-700 rounded-full"></div>
                    <div className="h-4 w-20 bg-zinc-300 dark:bg-zinc-700 rounded-sm"></div>
                  </div>
                  <div className="h-4 w-1 bg-zinc-300 dark:bg-zinc-700 rounded-full hover:bg-zinc-400 p-2 cursor-pointer"></div>
                </div>

                {/* Mock Dropdown for the 5th item to match image */}
                {item === 5 && activeTab === 0 && (
                  <div className="absolute top-44 left-1/2 bg-white dark:bg-zinc-900 shadow-md rounded-lg p-3 border border-zinc-200 dark:border-zinc-800 z-10 flex flex-col gap-3 w-28">
                    <div className="h-3 w-full bg-zinc-200 dark:bg-zinc-800 rounded-sm"></div>
                    <div className="h-3 w-full bg-zinc-200 dark:bg-zinc-800 rounded-sm"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </>
  );
}
