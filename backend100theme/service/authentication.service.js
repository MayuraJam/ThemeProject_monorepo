const supabase = require("../config/supabase.js");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const axios = require("axios");
//เข้าสู่ระบบด้วย Google
async function signInWithGoogle(req) {
    try {
        const authHeader = req;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return { message: "Invalid header", success: false };
        }
        const token = authHeader.split(" ")[1];

        const googleResponse = await axios.get(
            "https://www.googleapis.com/oauth2/v3/userinfo",
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        );

        const payload = googleResponse.data;

        // ดึง Google ID (sub) ออกมาใช้เป็นตัวอ้างอิง
        const googleId = payload.sub;

        // 1. ตรวจสอบว่ามี Google ID นี้ในตาราง Master_User หรือยัง (โดยไม่สนใจ Email)
        const { data: existingUser, error: checkError } = await supabase
            .from("Master_User")
            .select("*")
            .eq("supabase_UserId", googleId);

        if (checkError) throw checkError;

        let userData;

        // 2. เงื่อนไข: ถ้าค้นหาไม่เจอ (length === 0) แปลว่า Login ครั้งแรก
        if (existingUser.length === 0) {
            console.log("First time Google Login. Creating new user...");
            
            const { data: data1, error: error1 } = await supabase
                .from("Master_User")
                .insert({
                    supabase_UserId: googleId,
                    userName: payload.name,
                    email: payload.email,
                    firstname: "",
                    lastname: "",
                    status: 1,
                    created_at: new Date(),
                    updated_at: new Date(),
                    Career_field: "User"
                })
                .select();

            if (error1) {
                console.error("Insert Master_User Error:", error1.message);
                throw error1;
            }

            const { data: data2, error: error2 } = await supabase
                .from("UserRole")
                .insert({
                    user_id: data1[0].id, 
                    role_id: 2,
                    created_at: new Date(),
                    created_by: "admin_m"
                })
                .select();

            if (error2) {
                console.error("Insert UserRole Error, Rolling back Master_User...", error2.message);
                await supabase
                    .from("Master_User")
                    .delete()
                    .eq("id", data1[0].id);

                throw error2;
            }

            // นำข้อมูลที่เพิ่งสร้างใหม่ใส่ในตัวแปร userData (data1 คืนค่า row ที่ถูก insert มาให้แล้ว)
            userData = data1[0];

        } else {
            console.log("Existing Google User Login.");
            // ถ้าเคย Login แล้ว ก็ดึงข้อมูลเดิม (จากที่เราหาตอนแรก existingUser) มาใช้เลย
            userData = existingUser[0];
        }

        return { success: true, message: "Login successful", data: userData };
    } catch (error) {
        console.error(error);
        return { message: "Invalid token", success: false, error: error.message };
    }
}
//เข้าสู่ระบบด้วย email,password
async function signInWithEmailAndPassword(email, password) {
    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        });
        if (error) throw error;
        return data;
    } catch (error) {
        console.error("Error signing in with email and password:", error.message);
        throw error;
    }
}
//สมัครสมาชิกด้วย email,password
async function signUpWithEmailAndPassword(email, password) {
    try {
        let authUserId;

        // 1. ตรวจสอบว่าเป็น Mock User หรือไม่ (ดักโดเมน dummyjson.com หรืออื่นๆ)
        if (email.includes("dummyjson.com") || email.includes("@mock.com")) {
            console.log("Mock User Detected: Bypassing Supabase Auth for", email);
            const crypto = require("crypto");
            authUserId = crypto.randomUUID(); // สร้าง UUID ปลอมสำหรับ Mock Data
        } else {
            // สมัครสมาชิก Auth ตามปกติ
            const { data, error } = await supabase.auth.signUp({
                email: email,
                password: password,
            });
            if (error) throw error;

            authUserId = data.user.id;

            const { data: data3, error: error3 } = await supabase
                .from("Master_User")
                .select("*")
                .eq("supabase_UserId", authUserId);

            if (error3) {
                console.error("Get Master_User Error:", error3.message);
                throw error3;
            }
        }


        const { data: data1, error: error1 } = await supabase
            .from("Master_User")
            .insert({
                supabase_UserId: authUserId,
                userName: "",
                email: email,
                firstname: "",
                lastname: "",
                status: 1,
                created_at: new Date(),
                updated_at: new Date(),
                Career_field: "User"
            })
            .select();


        if (error1) {
            console.error("Insert Master_User Error:", error1.message);
            // ปกติควรลบ Auth User ที่เพิ่งสร้างด้วยถ้าทำได้ แต่ Client SDK มักจะลบ Auth ลำบาก
            throw error1;
        }


        const { data: data2, error: error2 } = await supabase
            .from("UserRole")
            .insert({
                user_id: data1[0].id, // .select() จะคืนค่ามาเป็น Array ต้องชี้ไปที่ index 0
                role_id: 2,
                created_at: new Date(),
                created_by: "admin_m"
            })
            .select();


        if (error2) {
            console.error("Insert UserRole Error, Rolling back Master_User...", error2.message);


            await supabase
                .from("Master_User")
                .delete()
                .eq("id", data1[0].id);

            throw error2;
        }

        //ส่วนของการ getข้อมุล User
        const { data: data3, error: error3 } = await supabase
            .from("Master_User")
            .select("*")
            .eq("id", data1[0].id);

        if (error3) {
            console.error("Get Master_User Error:", error3.message);
            throw error3;
        }

        return {
            message: "สมัครสมาชิกสำเร็จ",
            data: data3[0],
        };

    } catch (error) {
        console.error("Error signing up with email and password:", error.message);
        throw error;
    }
}
module.exports = {
    signInWithGoogle,
    signInWithEmailAndPassword,
    signUpWithEmailAndPassword
};