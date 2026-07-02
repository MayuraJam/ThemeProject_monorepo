import { CircleX, FileCheck, Upload } from "lucide-react";

export default function UploadFileComponent() {
    return (
        <>
            <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm  p-6">
                <div className="flex justify-between items-center mb-4">
                    <p className="font-semibold text-lg text-zinc-400 dark:text-zinc-500 uppercase tracking-wide">Upload file</p>
                    <div className="flex gap-2">
                        <div className="flex gap-2">
                            <div className='h-4 w-4 bg-green-200 dark:bg-zinc-700 rounded-full'></div>
                            <div className='h-4 w-4 bg-yellow-200 dark:bg-zinc-700 rounded-full'></div>
                            <div className='h-4 w-4 bg-red-200 dark:bg-zinc-700 rounded-full'></div>
                        </div>
                    </div>
                </div>

                <hr className='border-zinc-200 dark:border-zinc-800 mb-6' />

                <div className="flex items-center gap-4 justify-center h-[120px] border-dashed border-2 border-zinc-300 dark:border-zinc-700 rounded-xl p-6 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 hover:dark:bg-zinc-900 cursor-pointer">
                    <Upload strokeWidth={2} />
                    <p className="text-zinc-500 text-center">Click to Upload file</p>
                </div>
                {/* file card */}
                <div className="bg-white dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700/50 rounded-xl p-3 mt-4 shadow-sm hover:shadow transition-shadow">
                    <div className="flex gap-3 justify-between items-center">
                        <div className="flex gap-3 items-center">
                            <div className="p-2 bg-zinc-100 dark:bg-zinc-700/50 rounded-lg text-zinc-500 dark:text-zinc-400">
                                <FileCheck strokeWidth={2} size={22} />
                            </div>
                            <div className="flex flex-col">
                                <p className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Theme_mockup.pdf</p>
                                <p className="text-xs text-zinc-500 dark:text-zinc-400">20 MB</p>
                            </div>
                        </div>
                        <button className="text-zinc-400 hover:text-red-500 dark:text-zinc-500 dark:hover:text-red-400 transition-colors p-1" title="Remove file">
                            <CircleX strokeWidth={2} size={20} />
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}