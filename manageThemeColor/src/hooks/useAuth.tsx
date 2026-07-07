import { create } from "zustand";
import api from "../api/axios-instance";
import { ErrorProps } from "../type/ErrorType";
import { AuthState } from "../type/AuthType";

// interface AuthState {
//   isAuthenticated: boolean;
//   userData: Record<string, unknown>;
//   authLoading: boolean;
//   authMessage: string;
//   getMe: () => Promise<{ success: boolean; message?: string; data?: Record<string, unknown>; authMessage?: string }>;
// }

const useAuthentication = create<AuthState>((set) => ({
  isAuthenticated: false,
  userData: {
    email: "",
    email_verified: false,
    family_name: "",
    given_name: "",
    name: "",
    picture: "",
    sub: "",
  },
  authLoading: false,
  authMessage: "",
  getMe: async () => {
    set({ authLoading: true, authMessage: "" });
    try {
      const response = await api.get("/api/google-login");
      const responseData = response.data;
      if (!responseData) {
        throw new Error("หลังบ้านส่งของกลับมาเป็นค่าว่างเปล่า");
      }

      const { data, message, success } = responseData;

      set({
        userData: data || null,
        isAuthenticated: success ? true : false,
        authLoading: false,
        authMessage: message || "ดึงข้อมูลสำเร็จ",
      });
      return { success: success, message: message, data: data };
    } catch (error: unknown) {
      const err = error as ErrorProps;
      const errorMessage = err?.message || "เกิดข้อผิดพลาดที่ไม่รู้จัก";
      set({
        userData: {
          email: "",
          email_verified: false,
          family_name: "",
          given_name: "",
          name: "",
          picture: "",
          sub: "",
        },
        isAuthenticated: false,
        authLoading: false,
        authMessage: errorMessage,
      });

      return { success: false, authMessage: errorMessage };
    }
  },
}));

export default useAuthentication;
