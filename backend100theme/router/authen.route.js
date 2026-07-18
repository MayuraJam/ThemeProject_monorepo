const express = require("express");
const router = express.Router();
const {
    signInWithGoogle,
    signInWithEmailAndPassword,
    signUpWithEmailAndPassword
} = require("../controller/authentication.controller");

router.get("/google-login", signInWithGoogle);
router.post("/signInWithEmailAndPassword", signInWithEmailAndPassword);
router.post("/signUpWithEmailAndPassword", signUpWithEmailAndPassword);

module.exports = router;