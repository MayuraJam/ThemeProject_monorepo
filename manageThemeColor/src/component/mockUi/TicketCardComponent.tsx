import Ticket from "../component/custom-component/Ticket";
import Ticket2 from "../component/custom-component/Ticket2";
export const TicketCardComponent = () => (
    <>
        <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm p-6 border border-zinc-200 dark:border-zinc-800">
            <div className="flex justify-between items-center mb-4">
                <p className="font-semibold text-lg text-zinc-400 dark:text-zinc-500 uppercase tracking-wide">Ticket</p>
                <div className="flex gap-2">
                    <div className="flex gap-2">
                        <div className='h-4 w-4 bg-green-200 dark:bg-zinc-700 rounded-full'></div>
                        <div className='h-4 w-4 bg-yellow-200 dark:bg-zinc-700 rounded-full'></div>
                        <div className='h-4 w-4 bg-red-200 dark:bg-zinc-700 rounded-full'></div>
                    </div>
                </div>
            </div>

            <hr className='border-zinc-200 dark:border-zinc-800 mb-6' />

            <div className="flex flex-col items-center justify-center py-2 gap-5">
                <Ticket2  />
            </div>
        </div>
    </>
);
