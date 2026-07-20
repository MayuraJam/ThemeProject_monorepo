const supabase = require("../config/supabase.js");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const axios = require("axios");
const jwt = require('jsonwebtoken');
const crypto = require("crypto");
const tokenLimit = "1d"
//เข้าสู่ระบบด้วย Google เปลี่ยนไปดึงจาก jwt
async function signInWithGoogle(req) {
    try {
        const token = req; //get google token

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
                    Career_field: "User",
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
                    role_id: 1,
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

        const jwtToken = jwt.sign(
            {
                userId: userData.id,
                email: userData.email,
                role: userData.Career_field,
            },
            process.env.JWT_SECRET,
            { expiresIn: tokenLimit }
        );

        return { success: true, message: "Login successful", token: jwtToken };
    } catch (error) {
        console.error(error);
        return { message: "Invalid token", success: false, error: error.message };
    }
}


//get full profile from jwt


//เข้าสู่ระบบด้วย email,password
async function signInWithEmailAndPassword(email, password) {
    try {
        //ทำการเข้ารหัส password ด้วย sha256 
        const hashPassword = crypto.createHash("sha256").update(password).digest("hex");
        //ตรวจสอบใน master
        const { data: data1, error: error1 } = await supabase
            .from("Master_User")
            .select("*")
            .eq("email", email);


        if (error1) {
            console.error("กรุณากรอกอีเมลให้ถูกต้อง", error1.message);
            throw error1;
        }

        //ตรวจสอบว่า password ถูกต้องไหม
        if (data1[0].password !== hashPassword) {
            return { success: false, message: "รหัสผ่านไม่ถูกต้อง" };
        }

        if (data1.length === 0) {
            return { success: false, message: "ไม่พบผู้ใช้งาน" };
        }

        const userData = data1[0];
        //เข้ารหัส jwt
        const jwtToken = jwt.sign(
            {
                userId: userData.id,
                email: userData.email,
                role: userData.Career_field,
            },
            process.env.JWT_SECRET,
            { expiresIn: tokenLimit }
        );

        return { success: true, message: "เข้าสู่ระบบสำเร็จ", token: jwtToken };
        // return data;
    } catch (error) {
        console.error("Error signing in with email and password:", error.message);
        throw error;
    }
}
//สมัครสมาชิกด้วย email,password มีการเข้ารหัส JWT และใส่่รายละเอียด user
async function signUpWithEmailAndPassword(email, password) {
    try {
        let authUserId;

        //ตรวตสอบว่ามีในระบบไหม
        const { data, error } = await supabase
            .from("Master_User")
            .select("*")
            .eq("email", email);
        if (error) throw error;
        if (data.length > 0) return { message: "email นี้เคยลงทะเบียนแล้ว", success: false };
        if (email.includes("dummyjson.com") || email.includes("@mock.com") || email.includes("@example.com")) {
            authUserId = crypto.randomUUID();
        } else {
            // สมัครสมาชิก Auth ตามปกติ
            const { data, error } = await supabase.auth.signUp({
                email: email,
                password: password,
            });
            if (error) throw error;

            authUserId = data.user.id;

        }

        //ทำการเข้ารหัส password ด้วย sha256 และค่า salt random 
        // const salt = crypto.randomBytes(16).toString("hex");
        const hashPassword = crypto.createHash("sha256").update(password).digest("hex");

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
                Career_field: "User",
                password: hashPassword
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
                role_id: 1,
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

        const userData = data3[0];
        //เข้ารหัส jwt
        const jwtToken = jwt.sign(
            {
                userId: userData.id,
                email: userData.email,
                role: userData.Career_field,
            },
            process.env.JWT_SECRET,
            { expiresIn: tokenLimit }
        );

        return { success: true, message: "สมัครสมาชิกสำเร็จ", token: jwtToken };

    } catch (error) {
        console.error("Error signing up with email and password:", error.message);
        throw error;
    }
}

async function GetMe(req) {
    try {
        const authHeader = req; //get google token
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return { message: "Invalid header", success: false };
        }
        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const { data: data1, error: error1 } = await supabase
            .from("Master_User")
            .select(`
            id,
            supabase_UserId,
            email,
            userName,
            firstname,
            lastname,
            status,
            created_at,
            updated_at,
            Career_field,
            User_ImageFile(
             FilePath   
            ),
            UserRole(
               Master_Role(
                RolePermission(
                 Master_Permission(
                   PermissionName
                  )                   
                )
               )
              )
             )
            `)
            .eq("id", decoded.userId);
        if (error1) throw error1;
        return { success: true, message: "Get profile successful", data: data1[0] };
    } catch (error) {
        console.error("Error getting profile:", error.message);
        throw error;
    }
}
module.exports = {
    signInWithGoogle,
    signInWithEmailAndPassword,
    signUpWithEmailAndPassword,
    GetMe
};