const express = require("express");
const router = express.Router();
const {
  getAllTheme,
  getThemeById,
  getAllThemeForDropdown,
  insertNewTheme,
  updateTheme,
  addOrRemoveTheme
} = require("../controller/theme.controller");

router.get("/", getAllTheme);
router.get("/:id", getThemeById);
router.get("/dropdown", getAllThemeForDropdown);
router.post("/", insertNewTheme);
router.put("/", updateTheme);
router.post("/addOrRemoveTheme", addOrRemoveTheme);

module.exports = router;
