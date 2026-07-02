"use client";

import { Check, Clover, CopyIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function UserCard() {

    const [copyAccount, setCopyAccount] = useState<React.ReactNode>("");

    const copyToClipBoard = async (textToCopy: string) => {
        try {
            await navigator.clipboard.writeText(textToCopy);
            setCopyAccount(
                <span className="flex items-center gap-1 text-[10px] text-green-500">
                    <span>คัดลอกสำเร็จ</span>
                    <Check size={12} />
                </span>
            );
            setTimeout(() => setCopyAccount(""), 1500);
        } catch (ex) {
            setCopyAccount(<span className="text-[10px] text-red-500">ผิดพลาด</span>);
        }
    };
    
    return (
        <div className="p-2 pr-4 bg-white dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-700/50 rounded-full shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full border-2 border-[#85e783] overflow-hidden shadow-sm flex-shrink-0">
                        <Image
                            src="https://i.pravatar.cc/150?img=11"
                            alt="Profile"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="flex flex-col">
                        <p className="font-semibold text-sm text-zinc-800 dark:text-zinc-200 leading-tight">
                            Mathew Smith
                        </p>
                        <div className="flex items-center gap-1.5 mt-0.5">
                            <p className="text-zinc-500 dark:text-zinc-400 text-xs">@mathew123</p>
                            <button
                                className="text-zinc-400 hover:text-zinc-600 dark:text-zinc-500 dark:hover:text-zinc-300 transition-colors"
                                onClick={() => copyToClipBoard("@mathew123")}
                                title="คัดลอกชื่อบัญชี"
                            >
                                <CopyIcon size={12} />
                            </button>
                            {copyAccount && copyAccount}
                        </div>
                    </div>
                </div>
                <button className="text-zinc-400 hover:text-[#85e783] dark:text-zinc-500 dark:hover:text-[#85e783] transition-colors p-2" title="Action">
                    <Clover size={20} />
                </button>
            </div>
        </div>
    );
}