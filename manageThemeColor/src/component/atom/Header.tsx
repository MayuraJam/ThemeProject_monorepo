"use client";


export function Header({title}: {title: string}) {
    return (
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h2 className="text-2xl font-bold">{title}</h2>
        </div>
    );
}