import Card from "../component/Card";

export default function ChartComponent() {
    return (
        // <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm h-[340px] p-6 flex flex-col border border-zinc-200 dark:border-zinc-800">

        //     <div className="flex justify-between items-center mb-4">
        //         <p className="font-semibold text-lg text-zinc-400 dark:text-zinc-500 uppercase tracking-wide">PR DATA</p>
        //         <div className="flex gap-2">
        //             <div className='h-4 w-4 bg-green-200 dark:bg-zinc-700 rounded-full'></div>
        //             <div className='h-4 w-4 bg-yellow-200 dark:bg-zinc-700 rounded-full'></div>
        //             <div className='h-4 w-4 bg-red-200 dark:bg-zinc-700 rounded-full'></div>
        //         </div>
        //     </div>

        //     <hr className='border-zinc-200 dark:border-zinc-800 mb-6' />


        //     <div className="flex-1 flex flex-col justify-end">

        //         <div className="flex-1 flex items-end justify-around pb-3">

        //             <div className="flex items-end gap-1.5 sm:gap-2.5 h-full">
        //                 <div className="w-2.5 sm:w-3.5 bg-[#e8d555] rounded-sm" style={{ height: '35%' }}></div>
        //                 <div className="w-2.5 sm:w-3.5 bg-[#51cae8] rounded-sm" style={{ height: '55%' }}></div>
        //                 <div className="w-2.5 sm:w-3.5 bg-[#85e783] rounded-sm" style={{ height: '70%' }}></div>
        //             </div>

        //             <div className="flex items-end gap-1.5 sm:gap-2.5 h-full">
        //                 <div className="w-2.5 sm:w-3.5 bg-[#e8d555] rounded-sm" style={{ height: '80%' }}></div>
        //                 <div className="w-2.5 sm:w-3.5 bg-[#51cae8] rounded-sm" style={{ height: '95%' }}></div>
        //                 <div className="w-2.5 sm:w-3.5 bg-[#85e783] rounded-sm" style={{ height: '60%' }}></div>
        //             </div>

        //             <div className="flex items-end gap-1.5 sm:gap-2.5 h-full">
        //                 <div className="w-2.5 sm:w-3.5 bg-[#e8d555] rounded-sm" style={{ height: '80%' }}></div>
        //                 <div className="w-2.5 sm:w-3.5 bg-[#51cae8] rounded-sm" style={{ height: '60%' }}></div>
        //                 <div className="w-2.5 sm:w-3.5 bg-[#85e783] rounded-sm" style={{ height: '45%' }}></div>
        //             </div>
        //             {/* Q4 */}         <div className="flex items-end gap-1.5 sm:gap-2.5 h-full">
        //                 <div className="w-2.5 sm:w-3.5 bg-[#e8d555] rounded-sm" style={{ height: '40%' }}></div>
        //                 <div className="w-2.5 sm:w-3.5 bg-[#51cae8] rounded-sm" style={{ height: '60%' }}></div>
        //                 <div className="w-2.5 sm:w-3.5 bg-[#85e783] rounded-sm" style={{ height: '95%' }}></div>
        //             </div>
        //         </div>


        //         <div className="flex justify-around text-zinc-400 dark:text-zinc-500 font-medium text-base">
        //             <span>Q1</span>
        //             <span>Q2</span>
        //             <span>Q3</span>
        //             <span>Q4</span>
        //         </div>
        //     </div>


        //     <div className="flex justify-center gap-6 sm:gap-10 mt-6 mb-2">
        //         <div className="flex items-center gap-2">
        //             <span className="h-5 w-5 bg-[#e8d555] rounded-full"></span>
        //             <span className="text-zinc-500 dark:text-zinc-400 text-base">weekly</span>
        //         </div>
        //         <div className="flex items-center gap-2">
        //             <span className="h-5 w-5 bg-[#51cae8] rounded-full"></span>
        //             <span className="text-zinc-500 dark:text-zinc-400 text-base">Yearly</span>
        //         </div>
        //         <div className="flex items-center gap-2">
        //             <span className="h-5 w-5 bg-[#85e783] rounded-full"></span>
        //             <span className="text-zinc-500 dark:text-zinc-400 text-base">Quarterly</span>
        //         </div>
        //     </div>
        // </div>
        <>
            <Card title='PR Data'>
                
                <div className="h-[250px] w-full flex flex-col justify-end mt-4">

                    <div className="flex-1 flex items-end justify-around pb-3">

                        <div className="flex items-end gap-1.5 sm:gap-2.5 h-full">
                            <div className="w-2.5 sm:w-3.5 bg-yellow-500 rounded-sm" style={{ height: '35%' }}></div>
                            <div className="w-2.5 sm:w-3.5 bg-sky-500 rounded-sm" style={{ height: '55%' }}></div>
                            <div className="w-2.5 sm:w-3.5 bg-green-500 rounded-sm" style={{ height: '70%' }}></div>
                        </div>

                        <div className="flex items-end gap-1.5 sm:gap-2.5 h-full">
                            <div className="w-2.5 sm:w-3.5 bg-yellow-500 rounded-sm" style={{ height: '80%' }}></div>
                            <div className="w-2.5 sm:w-3.5 bg-sky-500 rounded-sm" style={{ height: '95%' }}></div>
                            <div className="w-2.5 sm:w-3.5 bg-green-500 rounded-sm" style={{ height: '60%' }}></div>
                        </div>

                        <div className="flex items-end gap-1.5 sm:gap-2.5 h-full">
                            <div className="w-2.5 sm:w-3.5 bg-yellow-500 rounded-sm" style={{ height: '80%' }}></div>
                            <div className="w-2.5 sm:w-3.5 bg-sky-500 rounded-sm" style={{ height: '60%' }}></div>
                            <div className="w-2.5 sm:w-3.5 bg-green-500 rounded-sm" style={{ height: '45%' }}></div>
                        </div>
                        <div className="flex items-end gap-1.5 sm:gap-2.5 h-full">
                            <div className="w-2.5 sm:w-3.5 bg-yellow-500 rounded-sm" style={{ height: '40%' }}></div>
                            <div className="w-2.5 sm:w-3.5 bg-sky-500 rounded-sm" style={{ height: '60%' }}></div>
                            <div className="w-2.5 sm:w-3.5 bg-green-500 rounded-sm" style={{ height: '95%' }}></div>
                        </div>
                    </div>


                    <div className="flex justify-around text-zinc-400 dark:text-zinc-500 font-medium text-base">
                        <span>Q1</span>
                        <span>Q2</span>
                        <span>Q3</span>
                        <span>Q4</span>
                    </div>
                </div>


                <div className="flex justify-center gap-6 sm:gap-10 mt-6 mb-2">
                    <div className="flex items-center gap-2">
                        <span className="h-5 w-5 bg-[#e8d555] rounded-full"></span>
                        <span className="text-zinc-500 dark:text-zinc-400 text-base">weekly</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="h-5 w-5 bg-[#51cae8] rounded-full"></span>
                        <span className="text-zinc-500 dark:text-zinc-400 text-base">Yearly</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="h-5 w-5 bg-[#85e783] rounded-full"></span>
                        <span className="text-zinc-500 dark:text-zinc-400 text-base">Quarterly</span>
                    </div>
                </div>
            </Card>
        </>
    )
}