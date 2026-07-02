"use client";

import { ArrowUpRight} from "lucide-react";
import UserCard from "./UserCard";

export default function UserListComponent() {

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