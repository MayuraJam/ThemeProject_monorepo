import { create } from "zustand";
import api from "../api/axios-instance";

interface AuthState {
  isAuthenticated: boolean;
  userData: any;
  authLoading: boolean;
  authMessage: string;
  getMe: () => Promise<{ success: boolean; message?: string; data?: any; authMessage?: string }>;
}

const useAuthentication = create<AuthState>((set) => ({
  isAuthenticated: false,
  userData: null,
  authLoading: false,
  authMessage: "",
  getMe: async () => {
    set({ authLoading: true, authMessage: "" });
    try {
      const response = await api.get("/api/google-login");

      // 🌟 ดักเช็คโครงสร้าง response ก่อนแกะ
      console.log("1. ตรวจสอบก้อน response ดิบจาก Axios:", response);

      // ป้องกันเคสลืมพิมพ์ .data หรือหลังบ้านพ่นโครงสร้างแปลก ๆ มา
      const responseData = response.data;
      if (!responseData) {
        throw new Error("หลังบ้านส่งของกลับมาเป็นค่าว่างเปล่า");
      }

      const { data, message, success } = responseData;
      console.log("2. ตรวจสอบ data ที่แกะออกมาแล้ว:", data);

      set({
        userData: data || null,
        isAuthenticated: success ? true : false,
        authLoading: false,
        authMessage: message || "ดึงข้อมูลสำเร็จ",
      });

      return { success: success, message: message, data: data };
    } catch (error : any) {
      console.error("💥 getMe ระเบิดในท่อน Catch! สาเหตุจาก:", error.message);

      // พังตรงไหนก็ต้องปิดสวิตช์โหลดดิ้ง และล้างค่าให้ปลอดภัย
      set({
        userData: null,
        isAuthenticated: false,
        authLoading: false,
        authMessage: error.message,
      });

      return { success: false, authMessage: error.message };
    }
  },
}));

export default useAuthentication;
