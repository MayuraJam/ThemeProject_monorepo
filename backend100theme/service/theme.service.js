const supabase = require("../config/supabase.js");

async function getAllTheme() {
    try {
        console.log("[DEBUG] getAllTheme() called");
        //ดึงข้อมูลจาก DB มาทั้งหมด เก็บในตัวแปร data
        const { data, error } = await supabase.from("Master_theme").select("*");

        console.log("[DEBUG] Supabase Response Error:", error);
        console.log("[DEBUG] Supabase Response Data:", data);

        if (error) {
            console.error("Supabase Query Error:", error.message);
            return null;
        }

        if (!data) {
            console.log("[DEBUG] No data returned from Supabase (null/undefined)");
            return [];
        }
        
        console.log(`[DEBUG] Mapping ${data.length} records`);
        return data.map((t) => ({
            id: t.id,
            created_at: t.created_at,
            themeName: t.themeName,
            color100: t.color100,
            color75: t.color75,
            color25: t.color25,
            color20: t.color20,
            colorTone: t.colorTone,
            category: t.category,
            isActive: 1,
            favoriteCount: t.favoriteCount,

        }));
    } catch (error) {
        console.error("ไม่สามารถดึงข้อมูลจาก Supabase ได้");
        console.error("[DEBUG] Exception in getAllTheme:", error);
        throw error;
    }
}

async function getThemeById(themeId) {
    try {

        //ดึงข้อมูลจาก DB มาทั้งหมด เก็บในตัวแปร data
        const { data, error } = await supabase
            .from("Master_theme")
            .select("*")
            .eq("id", themeId)
            .single();

        if (error) {
            console.error("Supabase Query Error:", error.message);
            return null;
        }

        if (!data) return [];

        return {
            data: data,
        };
    } catch (error) {
        console.error("ไม่สามารถดึงข้อมูลจาก Supabase ได้");
        throw error;
    }
}

//เฉพาะ account เราที่เห็น
async function getAllThemeForDropdown() {
    try {
        //ดึงข้อมูลจาก DB มาทั้งหมด เก็บในตัวแปร data
        const { data, error } = await supabase.from("Master_theme").select("*");

        if (error) {
            console.error("Supabase Query Error:", error.message);
            return null;
        }

        if (!data) return [];

        return data.map((t) => ({
            value: t.id,
            label: t.themeName,
            color: t.color100,
        }));
    } catch (error) {
        console.error("ไม่สามารถดึงข้อมูลจาก Supabase ได้");
        throw error;
    }
}

async function insertNewTheme(themeData) {
    try {
        const {
            themeName,
            color100,
            color75,
            color25,
            color20,
            colorTone,
            category
        } = themeData;

        const { data, error } = await supabase
            .from("Master_theme")
            .insert({
                created_at: new Date().toISOString(),
                themeName: themeName,
                color100: color100,
                color75: color75,
                color25: color25,
                color20: color20,
                colorTone: colorTone,
                category: category,
                isActive: 1,
                favoriteCount: 0
            })
            .select();

        if (error) {
            console.error("Supabase Query Error:", error.message);
            return null;
        }

        return {
            message: "เพิ่มธีมสีสำเร็จ",
            data: data,
        };
    } catch (error) {
        console.error("ไม่สามารถ เพิ่มข้อมูลธีมสีใหม่ได้");
        throw error;
    }
}

async function updateTheme(themeData) {
    try {
        const {
            id,
            themeName,
            color100,
            color75,
            color25,
            color20,
            colorTone,
            category,
            isActive,
            favoriteCount
        } = themeData;

        const { data, error } = await supabase
            .from("Master_theme")
            .update({
                themeName: themeName,
                color100: color100,
                color75: color75,
                color25: color25,
                color20: color20,
                colorTone: colorTone,
                category: category,
                isActive: isActive,
                favoriteCount: favoriteCount
            })
            .eq("id", id)
            .select();

        if (error) {
            console.error("Supabase Query Error:", error.message);
            return null;
        }

        return {
            data: data,
        };
    } catch (error) {
        console.error("ไม่สามารถ แก้ไขข้อมูลธีมสีใหม่ได้");
        throw error;
    }
}


//เพิ่มเข้าคลัง
async function addOrRemoveTheme(themeId, userId, transection_type) {
    try {
        //add
        //ตรวจสอบว่ามีรายการซ้ำไหม ก่อนเพิ่ม

        if (transection_type === 1) {

            const { data, error } = await supabase
                .from("Transection_Theme")
                .select("*")
                .eq("themeId", themeId)
                .eq("userId", userId);

            if (data.length > 0) {
                return {
                    success: false,
                    message: "มีข้อมูลแล้วในระบบ"
                };
            } else {
                const { data, error } = await supabase
                    .from("Transection_Theme")
                    .insert({
                        created_at: new Date().toISOString(),
                        userId: userId,
                        themeId: themeId,
                    })
                    .select();
                if (error) {
                    console.error("Supabase Add Error:", error.message);
                    return null;
                }

                return {
                    success: true,
                    message: "เพิ่มธีมสีสำเร็จ",
                    data: data
                };
            }
            if (error) {
                console.error("พบข้อผิดผลาดในการดึงข้อมูลจากฐานข้อมูล:", error.message);
                return null;
            }


        } else { //remove

            //ดูว่ามี ThemeId กับ userId ไหม
            const { data, error } = await supabase
                .from("Transection_Theme")
                .select("*")
                .eq("themeId", themeId)
                .eq("userId", userId);

            if (data.length == 0) {
                return {
                    success: false,
                    message: "ไม่พบข้อมูล"
                };
            }
            if (error) {
                console.error("Supabase Query Error:", error.message);
                return null;
            }

            const { data2, error2 } = await supabase
                .from("Transection_Theme")
                .delete()
                .eq("themeId", themeId)
                .eq("userId", userId);


            if (error2) {
                console.error("Supabase Remove Error:", error2.message);
                return null;
            }

            return {
                success: true,
                message: "ลบธีมสีสำเร็จ",
            };
        }


    } catch (error) {
        console.error("ไม่สามารถ เพิ่มข้อมูลธีมสีใหม่ได้");
        throw error;
    }
}


//ย้ายไปที่ favorite
//ย้ายออกจาก favorite
//ดึงตัวเลข ธีมสีที่ได้รับความนิยม แบบ realtime แสดงบน Dashboard ลองใช้ webhook

module.exports = {
    getAllTheme,
    insertNewTheme,
    getAllThemeForDropdown,
    updateTheme,
    getThemeById,
    addOrRemoveTheme
};
