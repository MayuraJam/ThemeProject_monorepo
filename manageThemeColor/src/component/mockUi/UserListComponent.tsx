"use client";

import { ArrowUpRight, Check, Clover, CopyIcon } from "lucide-react";
import { useState } from "react";
import UserCard from "./UserCard";

export default function UserListComponent() {

    const [copyAccount, setCopyAccount] = useState<any>("");

    const copyToClipBoard = async (textToCopy: string) => {
        try {
            await navigator.clipboard.writeText(textToCopy);
            setCopyAccount(
                <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ color: "text-zinc-500" }}>คัดลอกสำเร็จ</span>
                    <Check />
                </span>,
            );
            setTimeout(() => setCopyAccount(""), 1000);
        } catch (ex) {
            setCopyAccount("ไม่สามารถทำการคัดลอกได้");
        }
    };
    return (
        <>
            <div className="flex justify-between items-center px-2">
                <h3 className="font-bold text-lg hover:text-red-300 transition-colors cursor-pointer">User list</h3>
                <p className="text-zinc-500 dark:text-zinc-400 hover:text-red-300 flex items-center gap-2 transition-colors cursor-pointer">เพิ่มเติม <ArrowUpRight size={16} /></p>
            </div>
            <div className="flex flex-col gap-4">
                <UserCard />
                <UserCard />
                <UserCard />
            </div>
        </>

    )
}