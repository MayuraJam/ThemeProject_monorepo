const authenticationService = require("../service/authentication.service.js");

//การ ลงทะเบียนและ login ด้วย Supabase and Google 

async function signInWithGoogle(req, res) {
    try {
        const response = await authenticationService.signInWithGoogle(req.headers.authorization);
        res.json({
            success: response.success,
            message: response.message,
            data: response.data
        });
        
    } catch (error) {
        res.status(500).json({
            message: "เกิดข้อผิดผลาดในการเข้าสู่ระบบ",
            success: false,
            error: error.message,
        });
    }
}

async function signInWithEmailAndPassword(req, res) {
    try {
        const response = await authenticationService.signInWithEmailAndPassword(req.body);
        res.json({
            success: response.success,
            message: response.message,
        });
    } catch (error) {
        res.status(500).json({
            message: "เกิดข้อผิดผลาดในการเข้าสู่ระบบ",
            success: false,
            error: error.message,
        });
    }
}

async function signUpWithEmailAndPassword(req, res) {
    try {
        const response = await authenticationService.signUpWithEmailAndPassword(req.body.email, req.body.password);
        res.json({
            success: response.success,
            message: response.message,
            data: response.data ?? null,
        });
    } catch (error) {
        res.status(500).json({
            message: "เกิดข้อผิดผลาดในการเข้าสู่ระบบ",
            success: false,
            error: error.message,
        });
    }
}

module.exports = {
    signInWithGoogle,
    signInWithEmailAndPassword,
    signUpWithEmailAndPassword
};
