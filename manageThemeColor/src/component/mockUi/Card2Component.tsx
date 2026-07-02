import { Smile, MoveUpRight } from "lucide-react";
import { Button } from "../atom/Button";
import Image from "next/image";

export default function Card2Component() {
    return (
        <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800 p-6 flex flex-col gap-6">

            {/* Header */}
            <div className="flex justify-between items-center">
                <p className="font-semibold text-lg text-zinc-400 dark:text-zinc-500 uppercase tracking-wide">Sub header</p>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#558668] bg-[#eaf1e7] dark:bg-[#1a2c22] text-[#558668] dark:text-[#7ebf97]">
                    <Smile size={18} strokeWidth={2} />
                    <span className="text-sm font-medium">อนุมัติ</span>
                </div>
            </div>

            <hr className="border-zinc-200 dark:border-zinc-800" />

            {/* Image Area */}
            <div className="w-full h-[220px] rounded-2xl overflow-hidden bg-zinc-100 dark:bg-zinc-800 shadow-sm border border-zinc-100 dark:border-zinc-800">
                <Image
                    src="https://images.unsplash.com/photo-1528360983277-13d401cdc186?q=80&w=800&auto=format&fit=crop"
                    alt="Mock Thumbnail"
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Content Text */}
            <p className="text-zinc-600 dark:text-zinc-400 text-md leading-relaxed indent-8 px-2">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Non facere vero corporis
            </p>

            {/* Action Button */}

            <Button variant="primary" size="md" fullWidth className="cursor-pointer" rightIcon={<MoveUpRight />} >
                Get started
            </Button>
        </div>
    )
}