"use client"
import { useState } from "react";
import useAuthentication from "@/src/hooks/useAuth";
import { loginSchema, registerSchema } from "@/src/validate/loginValidate";
import * as yup from "yup";
import { useGoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import Image from "next/image";
import loginImage from '@/src/asset/image/loginImage.png';
import gg_logo from '@/src/asset/image/google-lens-icon-logo.png';

function LoginContent() {
    const router = useRouter();
    const { loginGoogle, getMe, register, login } = useAuthentication();
    const [isLogin, setIsLogin] = useState(true);
    const [openPassword, setOpenPassword] = useState<boolean>(false);
    const [openConfirmPassword, setOpenConfirmPassword] = useState<boolean>(false);

    interface inputProp {
        email: string,
        password: string,
        confirmPassword?: string
    }

    const [formData, setFormData] = useState<inputProp>({
        email: "",
        password: "",
        confirmPassword: ""
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleSubmit = async (req: inputProp) => {
        try {
            setErrors({});
            if (isLogin) {
                await loginSchema.validate(req, { abortEarly: false });
                // console.log("Login validated:", formData);
                // ต่อ API Login
                const getToken = await login(req.email, req.password)
                if (!getToken.success) {
                    localStorage.removeItem("auth-token");
                    localStorage.removeItem("loginStatus");

                    Swal.mixin({
                        toast: true,
                        position: "top-end",
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                            toast.onmouseenter = Swal.stopTimer;
                            toast.onmouseleave = Swal.resumeTimer;
                        },
                    }).fire({
                        icon: "error",
                        title: "เข้าสู่ระบบไม่สำเร็จ",
                    });
                    return;
                }
            } else {
                await registerSchema.validate(formData, { abortEarly: false });
                // console.log("Register validated:", formData);
                // ต่อ API Register
                const getToken = await register(req.email, req.password)
                if (!getToken.success) {
                    localStorage.removeItem("auth-token");
                    localStorage.removeItem("loginStatus");

                    Swal.mixin({
                        toast: true,
                        position: "top-end",
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                            toast.onmouseenter = Swal.stopTimer;
                            toast.onmouseleave = Swal.resumeTimer;
                        },
                    }).fire({
                        icon: "error",
                        title: "เข้าสู่ระบบไม่สำเร็จ",
                    });
                    return;
                }

            }
            // 2. เรียก Backend เพื่อตรวจสอบ Token
            const result = await getMe();
            console.log("Login result: ", result);

            if (!result.success) {
                localStorage.removeItem("googleAuthen");
                localStorage.removeItem("loginStatus");

                Swal.mixin({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.onmouseenter = Swal.stopTimer;
                        toast.onmouseleave = Swal.resumeTimer;
                    },
                }).fire({
                    icon: "error",
                    title: "เข้าสู่ระบบไม่สำเร็จ",
                });
                return;
            }
            Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                },
            }).fire({
                icon: "success",
                title: "เข้าสู่ระบบสำเร็จ",
            });

            localStorage.setItem("loginStatus", "true");
            router.push("/");
        } catch (err) {
            if (err instanceof yup.ValidationError) {
                const validationErrors: Record<string, string> = {};
                err.inner.forEach((error) => {
                    if (error.path) {
                        validationErrors[error.path] = error.message;
                    }
                });
                setErrors(validationErrors);
            }
        }
    };

    const handleModeSwitch = (mode: boolean) => {
        setIsLogin(mode);
        setErrors({});
        setFormData({ email: "", password: "", confirmPassword: "" });
    };

    const googleLogin = useGoogleLogin({
        onSuccess: async (response) => {
            // 1. เก็บแค่ Token เพื่อให้ axios นำไปใช้ยิง API ได้
            // localStorage.setItem("googleAuthen", JSON.stringify(response));
            console.log("Data form google login: ", response);

            const getToken = await loginGoogle(response.access_token)
            if (!getToken.success) {
                localStorage.removeItem("auth-token");
                localStorage.removeItem("loginStatus");

                Swal.mixin({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.onmouseenter = Swal.stopTimer;
                        toast.onmouseleave = Swal.resumeTimer;
                    },
                }).fire({
                    icon: "error",
                    title: "เข้าสู่ระบบไม่สำเร็จ",
                });
                return;
            }

            // 2. เรียก Backend เพื่อตรวจสอบ Token
            const result = await getMe();
            console.log("Login result: ", result);

            if (!result.success) {
                localStorage.removeItem("googleAuthen");
                localStorage.removeItem("loginStatus");

                Swal.mixin({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.onmouseenter = Swal.stopTimer;
                        toast.onmouseleave = Swal.resumeTimer;
                    },
                }).fire({
                    icon: "error",
                    title: "เข้าสู่ระบบไม่สำเร็จ",
                });
                return;
            }
            Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                },
            }).fire({
                icon: "success",
                title: "เข้าสู่ระบบสำเร็จ",
            });

            localStorage.setItem("loginStatus", "true");
            router.push("/");
        },
        onError: () => {
            console.error("Google Login Failed");
            Swal.fire({
                icon: "error",
                title: "เข้าสู่ระบบด้วย Google ล้มเหลว",
                text: "กรุณาลองใหม่อีกครั้ง",
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000
            });
        }
    });
    return (
        <div className="min-h-screen w-full  flex flex-col font-sans text-white relative">



            <div className="flex-1 flex items-center justify-center p-4 mt-6">
                <div className="w-full max-w-[320px] bg-[#111625] rounded-[2rem] shadow-2xl overflow-hidden border border-white/5 flex flex-col relative pb-6">


                    <div className="bg-[#7E3AF2] pt-8 pb-10 flex flex-col items-center relative">
                        <div className="flex items-center gap-3">
                            <Image src={loginImage} alt="logo" width={180} height={180} />
                        </div>


                        <div className="absolute -bottom-5 w-[85%] bg-[#1F2937] rounded-full p-1 flex shadow-lg border border-white/5 ">
                            <button
                                onClick={() => handleModeSwitch(true)}
                                className={`flex-1 py-1.5 text-xs font-medium rounded-full transition-all cursor-pointer ${isLogin ? 'bg-[#7E3AF2] text-white shadow-md' : 'text-gray-400 hover:text-white'}`}
                            >
                                Login
                            </button>
                            <button
                                onClick={() => handleModeSwitch(false)}
                                className={`flex-1 py-1.5 text-xs font-medium rounded-full transition-all cursor-pointer ${!isLogin ? 'bg-[#7E3AF2] text-white shadow-md' : 'text-gray-400 hover:text-white'}`}
                            >
                                SignIn
                            </button>
                        </div>
                    </div>


                    <div className="px-6 pt-10 flex flex-col gap-4">


                        <div className="flex flex-col gap-3">
                            <div className="flex flex-col gap-1">
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm">👤</span>
                                    <input
                                        type="email"
                                        placeholder={"name@example.com"}
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className={`w-full bg-[#0B0F19] border ${errors.email ? 'border-red-500 focus:border-red-500' : 'border-white/10 focus:border-[#7E3AF2]'} rounded-xl py-2.5 pl-10 pr-4 text-xs focus:outline-none transition-colors placeholder-gray-600`}
                                    />
                                </div>
                                {errors.email && <span className="text-red-500 text-[10px] ml-2">{errors.email}</span>}
                            </div>

                            {!isLogin && (
                                <div className="flex flex-col gap-3 bg-[#0B0F19] p-4 rounded-xl border border-white/5 mt-1 mb-1">
                                    <div className="flex gap-2">
                                        <div className={`h-2.5 flex-1 rounded-full transition-colors ${formData.password.length >= 8 ? 'bg-[#ED4C5C]' : 'bg-[#7E3AF2]/30'}`}></div>
                                        <div className={`h-2.5 flex-1 rounded-full transition-colors ${/\d/.test(formData.password) ? 'bg-[#F5A14D]' : 'bg-[#7E3AF2]/30'}`}></div>
                                        <div className={`h-2.5 flex-1 rounded-full transition-colors ${/[A-Z]/.test(formData.password) ? 'bg-[#FFFF99]' : 'bg-[#7E3AF2]/30'}`}></div>
                                        <div className={`h-2.5 flex-1 rounded-full transition-colors ${/[a-z]/.test(formData.password) ? 'bg-[#93E1D8]' : 'bg-[#7E3AF2]/30'}`}></div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-y-3 gap-x-2 text-[11px]">
                                        <div className="flex items-center gap-2">
                                            <div className={`w-1 h-1 rounded-full ${formData.password.length >= 8 ? 'bg-white' : 'bg-gray-500'}`}></div>
                                            <span className={formData.password.length >= 8 ? 'text-white' : 'text-gray-500'}>มีรหัส 8 ตัวอักษร</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className={`w-1 h-1 rounded-full ${/\d/.test(formData.password) ? 'bg-white' : 'bg-gray-500'}`}></div>
                                            <span className={/\d/.test(formData.password) ? 'text-white' : 'text-gray-500'}>มีตัวเลขอย่างน้อย 1 ตัว</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className={`w-1 h-1 rounded-full ${/[A-Z]/.test(formData.password) ? 'bg-white' : 'bg-gray-500'}`}></div>
                                            <span className={/[A-Z]/.test(formData.password) ? 'text-white' : 'text-gray-500'}>มีตัวพิมพ์ใหญ่</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className={`w-1 h-1 rounded-full ${/[a-z]/.test(formData.password) ? 'bg-white' : 'bg-gray-500'}`}></div>
                                            <span className={/[a-z]/.test(formData.password) ? 'text-white' : 'text-gray-500'}>มีตัวพิมพ์เล็ก</span>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="flex flex-col gap-1">
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm">🔒</span>
                                    <input
                                        type={openPassword ? 'text' : 'password'}
                                        placeholder="password"
                                        value={formData.password}
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                        className={`w-full bg-[#0B0F19] border ${errors.password ? 'border-red-500 focus:border-red-500' : 'border-white/10 focus:border-[#7E3AF2]'} rounded-xl py-2.5 pl-10 pr-10 text-xs focus:outline-none transition-colors placeholder-gray-600`}
                                    />
                                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer text-sm hover:text-gray-300" onClick={() => setOpenPassword(!openPassword)}>{openPassword ? '🙈' : '👁️'}</span>
                                </div>
                                {errors.password && <span className="text-red-500 text-[10px] ml-2">{errors.password}</span>}
                            </div>

                            {!isLogin && (
                                <div className="flex flex-col gap-1">
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm">🔒</span>
                                        <input
                                            type={openConfirmPassword ? 'text' : 'password'}
                                            placeholder="confirm password"
                                            value={formData.confirmPassword}
                                            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                            className={`w-full bg-[#0B0F19] border ${errors.confirmPassword ? 'border-red-500 focus:border-red-500' : 'border-white/10 focus:border-[#7E3AF2]'} rounded-xl py-2.5 pl-10 pr-10 text-xs focus:outline-none transition-colors placeholder-gray-600`}
                                        />
                                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer text-sm hover:text-gray-300" onClick={() => setOpenConfirmPassword(!openConfirmPassword)}>{openConfirmPassword ? '🙈' : '👁️'}</span>
                                    </div>
                                    {errors.confirmPassword && <span className="text-red-500 text-[10px] ml-2">{errors.confirmPassword}</span>}
                                </div>
                            )}
                        </div>

                        {isLogin && <div className="text-right text-[10px] text-gray-500 cursor-pointer hover:text-white mt-[-4px]">ลืมรหัสผ่าน</div>}
                        <hr className="border-gray-500/60  mt-[-4px]" />

                        <button
                            onClick={() => googleLogin()}
                            className="mt-1 w-full p-[1px] bg-gradient-to-r from-[#6EB5A5] to-[#F9F4DB] rounded-xl hover:opacity-90 transition-opacity cursor-pointer shadow-md"
                        >
                            <div className="flex items-center justify-center gap-2 bg-[#0B0F19] hover:bg-white/5 transition-colors w-full h-full rounded-xl py-2.5 ">
                                <Image src={gg_logo} alt="google" width={16} height={16} />
                                <span className="text-xs font-medium text-gray-300 hover:text-gray-800">Login by Google</span>
                            </div>
                        </button>


                        <button
                            onClick={() => handleSubmit(formData)}
                            className="mt-3 w-full bg-[#7E3AF2] hover:bg-[#6834d4] text-white rounded-xl py-2.5 text-sm font-semibold transition-colors shadow-lg shadow-purple-500/20 cursor-pointer"
                        >
                            {isLogin ? 'Log in' : 'Register'}
                        </button>

                        <div className="text-center text-[9px] text-gray-600 mt-2">
                            version : 1.1
                        </div>
                    </div>
                </div>
            </div>


            {/* <div className="w-full text-center p-4 text-[10px] text-gray-600 absolute bottom-0">
                Copyright © 2025 | Manage theme
            </div> */}
        </div>
    )
}

export default function LoginPage() {
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "YOUR_GOOGLE_CLIENT_ID";

    return (
        <GoogleOAuthProvider clientId={clientId}>
            <LoginContent />
        </GoogleOAuthProvider>
    );
}