import { Header } from "@/src/component/atom/Header";
import Card1Component from "@/src/component/mockUi/Card1Component";
import Card2Component from "@/src/component/mockUi/Card2Component";
import ChartComponent from "@/src/component/mockUi/ChartComponent";
import QRcodeCoponent from "@/src/component/mockUi/QRcodeComponent";
import UploadFileComponent from "@/src/component/mockUi/UploadFileComponent";
import UserListComponent from "@/src/component/mockUi/UserListComponent";
import "./style.css"
import GridComponent from "@/src/component/mockUi/GridComponent";
import { TicketCardComponent } from "@/src/component/mockUi/TicketCardComponent";

export default function Home() {
  return (
    <>
      {/* Header Area Skeleton */}
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-start">
          <div className="flex flex-col gap-3">
            <h3 className="font-semibold">page1 / page2 / page3</h3>
            <Header title="Mock UI" />
            <p className="text-sm text-zinc-500 dark:text-zinc-400">Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae dolores id necessitatibus officiis nam fugiat qui deserunt laudantium itaque a tempore animi rem recusandae laborum, ipsam eum asperiores ipsa architecto.</p>
          </div>
          {/* toggle switch */}
          <div className="flex items-center gap-4">
            <span className="text-muted">Display </span>
            <label className="switch">
              <input type="checkbox" />
              <span className="slider round"></span>
            </label>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="font-semibold">SubHader</h3>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae dolores id necessitatibus officiis nam fugiat qui deserunt laudantium itaque a tempore animi rem recusandae laborum, ipsam eum asperiores ipsa architecto.</p>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {/* Column 1 */}
        <div className="flex flex-col gap-6">
          {/* Card 1: Sub Header Area */}
          <Card1Component />
          {/* Card 4: Upload File Area */}
          <UploadFileComponent />
          {/* Card 4: Upload File Area */}
          <TicketCardComponent />
        </div>

        {/* Column 2 */}
        <div className="flex flex-col gap-6">
          {/* Card 2: Image Area */}
          <Card2Component />
          {/* Card 5: Buttons List Area */}
          <GridComponent/>
        </div>

        {/* Column 3 */}
        <div className="flex flex-col gap-6">
          {/* Card 3: Chart Area */}
          <ChartComponent />

          {/* Card 6: Users List Area */}
          <UserListComponent />

          {/* Card 7: QR Code Area */}
          <QRcodeCoponent />
        </div>

      </div>
    </>
  );
}
