"use client"
import useAuthentication from "@/src/hooks/useAuth";
import { useGoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/src/component/atom/Button";
import loginImage from '@/src/asset/image/loginImage.png';
import gg_logo from '@/src/asset/image/google-lens-icon-logo.png';

function LoginContent() {
    const router = useRouter();
    const getMe = useAuthentication((state) => state.getMe);

    const googleLogin = useGoogleLogin({
        onSuccess: async (response) => {
            // 1. เก็บแค่ Token เพื่อให้ axios นำไปใช้ยิง API ได้
            localStorage.setItem("googleAuthen", JSON.stringify(response));
            console.log("Data form google login: ", response);
            
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
        <>
            <div className="m-0 p-0 w-full h-full">
                <div className="flex items-center justify-center min-h-screen">
                    <div className="w-100 h-60 bg-white rounded-md p-3 flex flex-col items-center justify-center gap-2 shadow-md">
                        <Image
                            src={loginImage}
                            alt="profile image"
                            width={100}
                            height={100}
                        />
                        <Button variant="primary" size="md" fullWidth className="cursor-pointer" onClick={() => { googleLogin() }}>
                            <Image
                                src={gg_logo}
                                alt="google-icon"
                                width={20}
                                height={20}
                            />
                            Log in By อากู่
                        </Button>
                    </div>
                </div>
            </div>
        </>
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