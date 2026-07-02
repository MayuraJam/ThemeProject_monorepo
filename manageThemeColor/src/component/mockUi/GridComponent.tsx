
import { QrCode } from "lucide-react";

export default function GridComponent() {


    interface listProp {
        id: number,
        name: string,
        icon: string
    }

    const listMenu: listProp[] = [
        {
            id: 1,
            name: "Menu 1",
            icon: "https://www.thiings.co/_next/image?url=https%3A%2F%2Flftz25oez4aqbxpq.public.blob.vercel-storage.com%2Fimage-9IhROVM8JdIN8Q211KtkaluK7NwAjA.png&w=320&q=75"
        },
        {
            id: 2,
            name: "Menu 2",
            icon: "https://www.thiings.co/_next/image?url=https%3A%2F%2Flftz25oez4aqbxpq.public.blob.vercel-storage.com%2Fimage-1cmL9HzYRyPU2qUDs87VLcRJUJRFap.png&w=320&q=75"
        },
        {
            id: 3,
            name: "Menu 3",
            icon: "https://www.thiings.co/_next/image?url=https%3A%2F%2Flftz25oez4aqbxpq.public.blob.vercel-storage.com%2Fimage-VDRxz6J5iJIzo8K9onhDU7k9HR3Sqf.png&w=320&q=75"
        },
        {
            id: 4,
            name: "Menu 4",
            icon: "https://www.thiings.co/_next/image?url=https%3A%2F%2Flftz25oez4aqbxpq.public.blob.vercel-storage.com%2Fimage-8ndC63voIbMIG6qz5eULPUOZvhYFHS.png&w=1000&q=75"
        },
        {
            id: 5,
            name: "Menu 5",
            icon: "https://www.thiings.co/_next/image?url=https%3A%2F%2Flftz25oez4aqbxpq.public.blob.vercel-storage.com%2Fimage-s8ozaASL6xsglN3YE3T5MverBb8fNc.png&w=1000&q=75"
        },
        {
            id: 6,
            name: "Menu 6",
            icon: "https://www.thiings.co/_next/image?url=https%3A%2F%2Flftz25oez4aqbxpq.public.blob.vercel-storage.com%2Fimage-wfTlOZwF9NKbG6x0mDBuGPJcXSxwP0.png&w=1000&q=75"
        },
        {
            id: 7,
            name: "Menu 7",
            icon: "https://www.thiings.co/_next/image?url=https%3A%2F%2Flftz25oez4aqbxpq.public.blob.vercel-storage.com%2Fimage-Ymp0OSvV7P8xag21DghpVhvL4Ok4p7.png&w=1000&q=75"
        },
        {
            id: 8,
            name: "Menu 8",
            icon: "https://www.thiings.co/_next/image?url=https%3A%2F%2Flftz25oez4aqbxpq.public.blob.vercel-storage.com%2Fimage-RCaZASunua6zpYCxE2vhkGnftXRSyN.png&w=1000&q=75"
        },
    ]

    return (
        <>
            <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm p-6 border border-zinc-200 dark:border-zinc-800">
                <div className="flex justify-between items-center mb-4">
                    <p className="font-semibold text-lg text-zinc-400 dark:text-zinc-500 uppercase tracking-wide">Menu</p>
                    <div className="flex gap-2">
                        <div className="flex gap-2">
                            <div className='h-4 w-4 bg-green-200 dark:bg-zinc-700 rounded-full'></div>
                            <div className='h-4 w-4 bg-yellow-200 dark:bg-zinc-700 rounded-full'></div>
                            <div className='h-4 w-4 bg-red-200 dark:bg-zinc-700 rounded-full'></div>
                        </div>
                    </div>
                </div>

                <hr className='border-zinc-200 dark:border-zinc-800 mb-6' />

                <div className="flex overflow-x-auto lg:grid lg:grid-cols-2 gap-4 lg:overflow-y-auto lg:overflow-x-hidden pb-2 lg:pb-0 pr-2 custom-scrollbar">
                    {listMenu.map((item) => (
                        <div key={item.id} className="min-w-[110px] lg:w-full flex-shrink-0 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col items-center justify-center gap-3 cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors p-2">
                            <div className="w-10 lg:w-20 rounded-full relative">
                                <img src={item.icon} alt="icon" className='h-full w-full rounded-full mask grayscale hover:grayscale-0 hover:scale-110 transition-all duration-300 ease-in-out' />
                                {/* <div className="absolute inset-0 bg-pink-300 mix-blend-color"></div> */}
                            </div>
                            <div className="text-sm text-zinc-400 dark:text-zinc-500">{item.name}</div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}