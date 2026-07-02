import Link from 'next/link';
import { Frown } from 'lucide-react';
import imageContent from '@/src/asset/image/homeless.png';

export default function Notfound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-5">
            <div className="w-40 h-40 overflow-hidden bg-zinc-100 dark:bg-zinc-800 shadow-sm border border-zinc-100 dark:border-zinc-800">
                <img
                    src={imageContent.src}
                    alt="Mock Thumbnail"
                    className="w-full h-full object-cover grayscale contrast-200"
                />
            </div>
            <h1 className="text-5xl font-bold text-zinc-700 dark:text-zinc-300">404</h1>
            <p className="text-lg text-zinc-500 dark:text-zinc-400">หน้านี้กำลังอยู่ระหว่างการพัฒนา</p>
            <Link
                href="/"
                className="mt-4 px-6 py-3 bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 rounded-xl hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors font-medium shadow-sm"
            >
                กลับสู่หน้าหลัก
            </Link>
        </div>
    )
}
