
import { QrCode } from "lucide-react";
import Card from "../component/Card";

export default function QRcodeCoponent() {
    return (
        <>
            <Card title='QR code'>
                <div className="flex flex-col items-center justify-center py-2 gap-5">
                    <div className="p-3 bg-white border border-zinc-200 rounded-2xl shadow-sm">
                        <QrCode size={140} strokeWidth={1.2} className="text-zinc-900" />
                    </div>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 font-medium">สแกนเพื่อดูรายละเอียด</p>

                    <div className="flex flex-col items-center justify-center ">
                        <p className="text-base text-zinc-500 dark:text-zinc-400 ">xxx-xxx-xxx</p>
                        <p className="text-base text-zinc-500 dark:text-zinc-400 font-semibold">Mathew Smith</p>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400 ">@mathew123</p>

                    </div>
                </div>
            </Card>
        </>
    )
}