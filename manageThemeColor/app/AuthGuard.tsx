"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Navbar from "@/src/component/layout_component/Navbar";
import Sidebar from "@/src/component/layout_component/Sidebar";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // ข้อยกเว้น: ถ้าตอนนี้อยู่หน้า Login อยู่แล้ว ไม่ต้องเช็คซ้ำ ให้ผ่านไปเลย
    if (pathname.includes("/pages/loginPage")) {
      setIsChecking(false);
      return;
    }

    const isLogin = localStorage.getItem("loginStatus");
    if (isLogin !== "true") {
      router.push("/pages/loginPage"); // เตะไปหน้า Login จริงๆ (URL เปลี่ยน)
    } else {
      setIsChecking(false);
    }
  }, [router, pathname]);

  if (isChecking) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-zinc-500 animate-pulse">กำลังตรวจสอบสิทธิ์...</p>
      </div>
    );
  }

  // ถ้าอยู่หน้า Login ไม่ต้องแสดง Navbar และ Sidebar
  if (pathname.includes("/pages/loginPage")) {
    return <>{children}</>;
  }

 
  return (
    <>
      <div>
        <Navbar />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar />
          <main className="flex-1 w-full bg-zinc-100/50 dark:bg-zinc-950/50 overflow-y-auto h-[calc(100vh-4rem)] p-6 md:p-10">
            <div className="max-w-6xl mx-auto flex flex-col gap-8">
              {children}
              <div className="flex justify-center mt-4 pb-4">
                <p>Theme web | @2026</p>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
