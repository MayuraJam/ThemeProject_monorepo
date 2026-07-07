"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
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
import MockUi from "./pages/mockUi/page";

export default function Home() {
  
  return (
    <>
      <MockUi />
    </>
  );
}
