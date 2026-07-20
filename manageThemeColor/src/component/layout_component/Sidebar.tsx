"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronsLeft, ChevronsRight, Command, Database, Leaf, Settings, Sparkle, Trophy } from 'lucide-react';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(true);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const closeOnMobile = () => {
    if (window.innerWidth < 768) {
      setIsOpen(false);
    }
  };

  interface SidebarProp {
    name: string;
    path: string;
    icon: React.ReactNode;
    permission?: string;
  }

  const menuSidebar: SidebarProp[] = [
    {
      name: "Mock UI",
      path: "/",
      icon: <Leaf />,
      permission: ""
    },
    {
      //admin สร้างและจัดการ
      name: "Manage Theme list",
      path: "/pages/manageThemeList",
      icon: <Command />,
      permission: ""
    },
    {
      name: "Theme list All",
      path: "/pages/themeList",
      icon: <Database />,
      permission: ""
    },
    {
      name: "Your Theme list",
      path: "/pages/notfound",
      icon: <Trophy />,
      permission: ""
    },
    {
      //ลูกค้าสร้างและจัดการ
      name: "Create your Theme",
      path: "/pages/notfound",
      icon: <Sparkle />,
      permission: ""
    },
  ]

  return (
    <>
      {/* Mobile Hamburger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="md:hidden fixed top-3 left-4 z-30 p-2 bg-zinc-100 dark:bg-zinc-800 rounded-md text-black dark:text-white focus:outline-none shadow-sm border border-zinc-200 dark:border-zinc-700"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-40 transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar container */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 transform transition-all duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
          md:translate-x-0 md:static md:sticky md:top-16
          bg-zinc-50 dark:bg-zinc-950 border-r border-zinc-200 dark:border-zinc-800 
          flex flex-col h-full md:h-[calc(100vh-4rem)]
          w-64 ${!isOpen ? 'md:w-16' : ''} overflow-hidden
        `}
      >
        <div className="p-4 flex justify-between items-center md:justify-end border-b border-zinc-200 dark:border-zinc-800 h-16 md:h-auto">
          {/* Menu title for mobile */}
          <span className="font-bold md:hidden text-black dark:text-white">Menu</span>

          {/* Desktop toggle button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-1 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded text-zinc-500 dark:text-zinc-400 focus:outline-none hidden md:block cursor-pointer"
          >
            {isOpen ? <ChevronsLeft /> : <ChevronsRight />}
          </button>

          {/* Mobile close button */}
          <button
            onClick={() => setIsOpen(false)}
            className="p-1 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded text-zinc-500 dark:text-zinc-400 focus:outline-none md:hidden"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav className="flex flex-col gap-2 p-2 mt-2">

          {
            menuSidebar.map((item, index) => {
              return (
                <Link
                  key={index}
                  href={item.path}
                  className={`flex items-center gap-3 p-2 rounded transition-colors ${pathname === item.path ? 'bg-zinc-200 dark:bg-zinc-800 text-black dark:text-white' : 'hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300'}`}
                  title={item.name}
                  onClick={closeOnMobile}
                >
                  <span className="text-xl flex-shrink-0 flex items-center justify-center w-6">{item.icon}</span>
                  <span className={`whitespace-nowrap font-medium ${!isOpen ? 'md:hidden' : ''} playpen-sans-hebrew`}>{item.name}</span>
                </Link>
              )
            })
          }
          <hr className='border-zinc-200 dark:border-zinc-800' />
          <Link
            href="/pages/setting"
            className={`flex items-center gap-3 p-2 rounded transition-colors ${pathname === '/pages/setting' ? 'bg-zinc-200 dark:bg-zinc-800 text-black dark:text-white' : 'hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300'}`}
            title="Settings"
            onClick={closeOnMobile}
          >
            <span className="text-xl flex-shrink-0 flex items-center justify-center w-6"><Settings /></span>
            <span className={`whitespace-nowrap font-medium ${!isOpen ? 'md:hidden' : ''} playpen-sans-hebrew`}>Settings</span>
          </Link>
        </nav>
      </aside>
    </>
  );
}
