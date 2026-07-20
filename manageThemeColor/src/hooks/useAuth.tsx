import { create } from "zustand";
import api from "../api/axios-instance";
import { ErrorProps } from "../type/ErrorType";
import { AuthState } from "../type/AuthType";
import axios from "axios";


const useAuthentication = create<AuthState>((set) => ({
  isAuthenticated: false,
  userData: {
    id: 0,
    supabase_UserId: "",
    userName: "",
    created_at: new Date(),
    updated_at: new Date(),
    email: "",
    status: 0,
    firstname: "",
    lastname: "",
    Career_field: "",
    password: "",
  },
  authLoading: false,
  authMessage: "",

  loginGoogle: async (token: string) => {
    set({ authLoading: true, authMessage: "" });
    try {
      const response = await axios.post(process.env.NEXT_PUBLIC_SERVER_URL + "/api/authen/google-login", { token });
      const responseData = response.data;
      if (!responseData) {
        throw new Error("Not found token response");
      }

      const { data, message, success } = responseData;
      localStorage.setItem("auth-token", data);
      set({
        isAuthenticated: success ? true : false,
        authLoading: false,
        authMessage: message || "Login Google สำเร็จ",
      });
      return { success: success, message: message };
    } catch (error: unknown) {
      const err = error as ErrorProps;
      const errorMessage = err?.message;
      set({
        isAuthenticated: false,
        authLoading: false,
        authMessage: errorMessage,
      });

      return { success: false, authMessage: errorMessage };
    }
  },

  register: async (email: string, password: string) => {
    set({ authLoading: true, authMessage: "" });
    try {
      const response = await axios.post(process.env.NEXT_PUBLIC_SERVER_URL + "/api/authen/signUpWithEmailAndPassword", { email, password });
      const responseData = response.data;
      if (!responseData) {
        throw new Error("Not found token response");
      }

      const { data, message, success } = responseData;
      localStorage.setItem("auth-token", data);
      set({
        isAuthenticated: success ? true : false,
        authLoading: false,
        authMessage: message || "ลงทะเบียนสำเร็จ",
      });
      return { success: success, message: message };
    } catch (error: unknown) {
      const err = error as ErrorProps;
      const errorMessage = err?.message;
      set({
        isAuthenticated: false,
        authLoading: false,
        authMessage: errorMessage,
      });

      return { success: false, authMessage: errorMessage };
    }
  },

  login: async (email: string, password: string) => {
    set({ authLoading: true, authMessage: "" });
    try {
      const response = await axios.post(process.env.NEXT_PUBLIC_SERVER_URL + "/api/authen/signInWithEmailAndPassword", { email, password });
      const responseData = response.data;
      if (!responseData) {
        throw new Error("Not found token response");
      }

      const { data, message, success } = responseData;
      localStorage.setItem("auth-token", data);
      set({
        isAuthenticated: success ? true : false,
        authLoading: false,
        authMessage: message || "เข้าสู่ระบบสำเร็จ",
      });
      return { success: success, message: message };
    } catch (error: unknown) {
      const err = error as ErrorProps;
      const errorMessage = err?.message;
      set({
        isAuthenticated: false,
        authLoading: false,
        authMessage: errorMessage,
      });

      return { success: false, authMessage: errorMessage };
    }
  },

  getMe: async () => {
    set({ authLoading: true, authMessage: "" });
    try {
      //ส่ง acessh token ผ่าน header
      const response = await api.get("/api/authen/get-me");
      const responseData = response.data;
      if (!responseData) {
        throw new Error("Not found data");
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
          id: 0,
          supabase_UserId: "",
          userName: "",
          created_at: new Date(),
          updated_at: new Date(),
          email: "",
          status: 0,
          firstname: "",
          lastname: "",
          Career_field: "",
          password: "",
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
