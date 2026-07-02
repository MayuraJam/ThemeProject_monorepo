"use client"
import { Smile, ThumbsUp, ThumbsDown, MessageCircle, GitCompareArrows } from "lucide-react";
import { Button } from "../atom/Button";
import ExampleModal from "@/src/modal/exampleModal";
import { useState } from "react";

export default function Card1Component() {
    const [isOpen,setIsOpen] = useState<boolean>(false)
    return (
        <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800 p-6 flex flex-col gap-5">

            {/* Header */}
            <div className="flex justify-between items-center">
                <p className="font-semibold text-lg text-zinc-400 dark:text-zinc-500 uppercase tracking-wide">Sub header</p>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#558668] bg-[#eaf1e7] dark:bg-[#1a2c22] text-[#558668] dark:text-[#7ebf97]">
                    <Smile size={18} strokeWidth={2} />
                    <span className="text-sm font-medium">อนุมัติ</span>
                </div>
            </div>

            <hr className="border-zinc-200 dark:border-zinc-800" />

            {/* Content Text */}
            <p className="text-zinc-600 dark:text-zinc-400 text-md leading-relaxed indent-8">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Non facere vero corporis officiis repellat dignissimos commodi aspernatur saepe quasi magni omnis molestiae consequuntur odit necessitatibus repudiandae dicta, provident quidem laudantium.
            </p>

            {/* Input Area */}
            <div className="mt-1">
                <input
                    type="text"
                    placeholder="เพิ่มความคิดเห็น... ได้ที่นี้นะจร้าาา"
                    className="w-full border border-[#d6ddc5] dark:border-zinc-700 rounded-lg px-4 py-3 bg-transparent text-base focus:outline-none focus:ring-2 focus:ring-[#8a9477]/30 placeholder-zinc-400 dark:placeholder-zinc-500"
                />
            </div>

            {/* Footer Actions */}
            <div className="flex items-center justify-between mt-2 flex-wrap gap-4">
                {/* Left Side: Interactions */}
                <div className="flex items-center gap-5 sm:gap-6 text-zinc-500 dark:text-zinc-400">
                    <button className="flex items-center gap-2 hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors focus:outline-none group">
                        <ThumbsUp size={28} strokeWidth={1.5} className="group-hover:-translate-y-1 transition-transform" />
                        <span className="text-xl">20</span>
                    </button>
                    <button className="flex items-center gap-2 hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors focus:outline-none group">
                        <ThumbsDown size={28} strokeWidth={1.5} className="group-hover:translate-y-1 transition-transform" />
                        <span className="text-xl">20</span>
                    </button>
                </div>
                    <button className="flex items-center  gap-2 hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors focus:outline-none ml-2">
                        <MessageCircle size={30} strokeWidth={1.5} />
                        <span className="text-sm hidden sm:block">แสดงความคิดเห็น...</span>
                    </button>

                {/* Right Side: Action Button */}
                <Button variant="primary" size="md" fullWidth className="cursor-pointer" rightIcon={<GitCompareArrows />} onClick={()=>setIsOpen(true)}>
                    push it
                </Button>
            </div>
            <ExampleModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
        </div>
    )
}