"use client";
import CategorySection from '@/src/component/CategorySection';
import { Header } from '@/src/component/atom/Header';
import { useState } from 'react';
import { Copy, Check } from "lucide-react";

function ColorBlock({ colorClass, hexCode, flexClass = "flex-1" }: { colorClass: string, hexCode: string, flexClass?: string }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = (e: React.MouseEvent) => {
        e.stopPropagation();
        navigator.clipboard.writeText(hexCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    };

    return (
        <div className={`relative w-full group/color transition-colors ${flexClass} ${colorClass}`}>
            <div 
                className="absolute inset-0 opacity-0 group-hover/color:opacity-100 bg-black/40 flex items-center justify-center transition-opacity cursor-pointer backdrop-blur-[1px]" 
                onClick={handleCopy} 
                title="คัดลอกรหัสสี"
            >
                {copied ? (
                    <div className="flex items-center gap-1 text-white text-xs font-medium bg-green-500/90 px-2 py-1 rounded-md shadow-sm">
                        <Check size={14} /> Copied
                    </div>
                ) : (
                    <div className="flex items-center gap-1 text-white text-xs font-medium bg-black/50 px-2 py-1 rounded-md shadow-sm">
                        <Copy size={14} /> {hexCode}
                    </div>
                )}
            </div>
        </div>
    );
}

export default function ThemeListPage() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <>
      {/* Header Section */}
      <div className="flex flex-col">

        {/* Page Title Skeleton */}
        <Header title="Theme List" />
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col lg:flex-row gap-6 mt-2">

        <CategorySection />

        {/* Right Column: Theme List Skeleton */}
        <div className="flex-1 bg-white dark:bg-zinc-900 rounded-2xl shadow-sm p-6 flex flex-col gap-6 h-[calc(100vh-14rem)] relative">

          {/* Tabs */}
          <div className="flex border-b border-zinc-200 dark:border-zinc-800 flex-shrink-0">
            <button
              onClick={() => setActiveTab(0)}
              className={`flex-1 flex justify-center pb-3 border-b-2 transition-colors cursor-pointer ${activeTab === 0 ? 'border-zinc-400 dark:border-zinc-500' : 'border-transparent hover:border-zinc-300 dark:hover:border-zinc-700'}`}
            >
              <div className={`h-4 w-16 rounded-sm transition-colors ${activeTab === 0 ? 'text-zinc-400 dark:text-zinc-600' : 'text-zinc-200 dark:text-zinc-800'}`}>ธีมสว่าง</div>
            </button>
            <button
              onClick={() => setActiveTab(1)}
              className={`flex-1 flex justify-center pb-3 border-b-2 transition-colors cursor-pointer ${activeTab === 1 ? 'border-zinc-400 dark:border-zinc-500' : 'border-transparent hover:border-zinc-300 dark:hover:border-zinc-700'}`}
            >
              <div className={`h-4 w-16 rounded-sm transition-colors ${activeTab === 1 ? 'text-zinc-400 dark:text-zinc-600' : 'text-zinc-200 dark:text-zinc-800'}`}>ธีมมืด</div>
            </button>
          </div>

          {/* Theme Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 pt-4 overflow-y-auto pr-2 pb-16 custom-scrollbar">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className="flex flex-col gap-4 relative cursor-pointer group">
                {/* Color Palette Dummy */}
                <div className="h-48 w-full rounded-xl overflow-hidden flex flex-col shadow-sm border border-zinc-100 dark:border-zinc-800 group-hover:shadow-md transition-shadow">
                  <ColorBlock 
                      flexClass="flex-[2]" 
                      colorClass={activeTab === 1 ? 'bg-zinc-800 dark:bg-zinc-950' : 'bg-zinc-900 dark:bg-black'} 
                      hexCode={activeTab === 1 ? '#27272a' : '#18181b'} 
                  />
                  <ColorBlock 
                      colorClass="bg-zinc-600 dark:bg-zinc-700" 
                      hexCode={activeTab === 1 ? '#3f3f46' : '#52525b'} 
                  />
                  <ColorBlock 
                      colorClass="bg-zinc-300 dark:bg-zinc-400" 
                      hexCode={activeTab === 1 ? '#a1a1aa' : '#d4d4d8'} 
                  />
                  <ColorBlock 
                      colorClass={activeTab === 1 ? 'bg-indigo-400 dark:bg-indigo-500' : 'bg-sky-400 dark:bg-sky-500'} 
                      hexCode={activeTab === 1 ? '#818cf8' : '#38bdf8'} 
                  />
                </div>

                {/* Theme Title & Actions Row 1 */}
                <div className="flex justify-between items-center px-1">
                  <div className="flex items-center gap-2">
                    <div className="h-5 w-5 bg-zinc-300 dark:bg-zinc-700 rounded-full"></div>
                    <div className="h-4 w-20 bg-zinc-300 dark:bg-zinc-700 rounded-sm"></div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-5 w-5 bg-zinc-300 dark:bg-zinc-700 rounded-md"></div>
                    <div className="h-4 w-12 bg-zinc-300 dark:bg-zinc-700 rounded-sm"></div>
                  </div>
                </div>

                {/* Stats Row 2 */}
                <div className="flex justify-between items-center px-1 pt-1 border-t border-zinc-100 dark:border-zinc-800/50 mt-1 pt-3">
                  <div className="flex items-center gap-2">
                    <div className="h-5 w-5 bg-zinc-200 dark:bg-zinc-800 rounded-full"></div>
                    <div className="h-4 w-8 bg-zinc-200 dark:bg-zinc-800 rounded-sm"></div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-5 w-5 bg-zinc-200 dark:bg-zinc-800 rounded-sm"></div>
                    <div className="h-4 w-12 bg-zinc-200 dark:bg-zinc-800 rounded-sm"></div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-5 w-5 bg-zinc-200 dark:bg-zinc-800 rounded-full"></div>
                    <div className="h-4 w-10 bg-zinc-200 dark:bg-zinc-800 rounded-sm"></div>
                  </div>
                </div>
              </div>
            ))}

            {/* Load More Button Wrapper */}
            <div className="xl:col-span-2 flex justify-center mt-2 pb-8">
              <div className="h-10 w-28 bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-full shadow-sm hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors cursor-pointer flex items-center justify-center">
                <div className="h-3 w-12 bg-zinc-300 dark:bg-zinc-600 rounded-sm"></div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}
