import Card from "../component/Card";
import Ticket from "../component/custom-component/Ticket";
import Ticket2 from "../component/custom-component/Ticket2";
export const TicketCardComponent = () => (
    <>
        <Card title='Ticket'>
            <div className="flex flex-col items-center justify-center py-2 gap-5">
                <Ticket2 />
            </div>
        </Card>
    </>
);
