"use client";

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Palette } from 'lucide-react';
import Image from 'next/image';

export default function Navbar() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isThemeOpen, setIsThemeOpen] = useState(false);
  const dropdownProfileRef = useRef<HTMLDivElement>(null);
  const dropdownThemeRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownProfileRef.current && !dropdownProfileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    }

    function handleClickOutsideTheme(event: MouseEvent) {
      if (dropdownThemeRef.current && !dropdownThemeRef.current.contains(event.target as Node)) {
        setIsThemeOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("mousedown", handleClickOutsideTheme);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("mousedown", handleClickOutsideTheme);
    };
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/pages/loginPage";
  };

  return (
    <nav className="h-16 bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 flex items-center px-4 justify-between w-full sticky top-0 z-20">
      <div className="font-bold text-xl text-black dark:text-white ml-10 md:ml-0 me-5">
        Theme web
      </div>
      <div className="flex items-center gap-4">
        {/* Mock Action Icons */}
        <div className="relative ml-2" ref={dropdownThemeRef}>
          <button
            onClick={() => setIsThemeOpen(!isThemeOpen)}
            className="text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200 cursor-pointer" title='select-theme'>
            <Palette />
          </button>
          {isThemeOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg shadow-lg py-1 z-50 overflow-hidden text-sm ">
              <div className="py-1">
                <button
                  className="w-full text-left px-4 py-2 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                  onClick={() => console.log('Theme Color 1')}
                >
                  ธีมที่ 1
                </button>
                <button
                  className="w-full text-left px-4 py-2 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                  onClick={() => console.log('Theme Color 2')}
                >
                  ธีมที่ 2
                </button>
                <button
                  className="w-full text-left px-4 py-2 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                  onClick={() => console.log('Theme Color 3')}
                >
                  ธีมที่ 3
                </button>
                <button
                  className="w-full text-left px-4 py-2 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                  onClick={() => console.log('Theme Color 4')}
                >
                  ธีมที่ 4
                </button>
              </div>
            </div>
          )}
        </div>
        <button className="text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200 relative cursor-pointer">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
          <span className="absolute top-0 right-0 block h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-white dark:ring-zinc-900"></span>
        </button>

        {/* Profile Dropdown */}
        <div className="relative ml-2" ref={dropdownProfileRef}>
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center focus:outline-none cursor-pointer"
          >
            <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-zinc-200 dark:border-zinc-700">
              <Image
                src="https://i.pravatar.cc/150?img=11"
                alt="Profile"
                className="object-cover"
                width={150}
                height={150}
              />
            </div>
          </button>

          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg shadow-lg py-1 z-50 overflow-hidden text-sm">
              <div className="px-4 py-3 border-b border-zinc-100 dark:border-zinc-800 flex flex-col justify-center items-center">
                <div className="w-20 h-20 mb-3 rounded-full overflow-hidden border-6 border-green-400 dark:border-zinc-700">
                  <Image
                    src="https://i.pravatar.cc/150?img=11"
                    alt="Profile"
                    className="object-cover"
                    width={150}
                    height={150}
                  />
                </div>
                <p className="text-lg font-semibold text-zinc-900 dark:text-white text-center">สวัสดี Mathew</p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 text-center">Designer</p>
              </div>

              <div className="py-1">
                <Link href="/pages/notfound" className="block px-4 py-2 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800">
                  Profile
                </Link>
              </div>

              <div className="border-t border-zinc-100 dark:border-zinc-800 py-1">
                <button
                  className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
