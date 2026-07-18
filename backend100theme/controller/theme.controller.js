const themeService = require("../service/theme.service");
async function getAllTheme(req, res) {
  try {
    console.log("[DEBUG]getAllTheme controller called");
    const response = await themeService.getAllTheme();
    res.json({
      success: true,
      message: "ดึงข้อมูลสำเร็จ",
      data: response,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "เกิดข้อผิดผลาดในการดึงข้อมูล",
      success: false,
      error: error.message,
    });
  }
}

async function getThemeById(req, res) {
  try {
    const reqParam = req.params.id;
    const response = await themeService.getThemeById(reqParam);
    res.json({
      success: true,
      message: "ดึงข้อมูลสำเร็จ",
      data: response,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "เกิดข้อผิดผลาดในการดึงข้อมูล",
      success: false,
      error: error.message,
    });
  }
}

async function getAllThemeForDropdown(req, res) {
  try {
    const response = await themeService.getAllThemeForDropdown();
    res.json({
      success: true,
      message: "ดึงข้อมูลสำเร็จ",
      data: response,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "เกิดข้อผิดผลาดในการดึงข้อมูล",
      success: false,
      error: error.message,
    });
  }
}

async function insertNewTheme(req, res) {
  try {
    const response = await themeService.insertNewTheme(req.body);
    res.json({
      success: true,
      message: "ดึงข้อมูลสำเร็จ",
      data: response,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "เกิดข้อผิดผลาดในการเพิ่มข้อมูล",
      success: false,
      error: error.message,
    });
  }
}

async function updateTheme(req, res) {
  try {
    const response = await themeService.updateTheme(req.body);
    res.json({
      success: true,
      message: "อัปเดตข้อมูลสำเร็จ",
      data: response,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "เกิดข้อผิดผลาดในการอัปเดตข้อมูล",
      success: false,
      error: error.message,
    });
  }
}

async function addOrRemoveTheme(req, res) {
  try {
    const {themeId, userId, transection_type} = req.body;
    const response = await themeService.addOrRemoveTheme(themeId, userId, transection_type);
    if (response.success) {
      res.json({
        success: true,
        message: response.message,
        data: response.data,
      });
    } else {
      res.json({
        success: false,
        message: response.message
      });
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "เกิดข้อผิดผลาดในการอัปเดตข้อมูล",
      success: false,
      error: error.message,
    });
  }
}

module.exports = {
  getAllTheme,
  getThemeById,
  getAllThemeForDropdown,
  insertNewTheme,
  updateTheme,
  addOrRemoveTheme
};
