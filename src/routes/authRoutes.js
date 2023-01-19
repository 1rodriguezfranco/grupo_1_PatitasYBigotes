const express = require("express");
const router = express.Router();
const authRouter = require("../controllers/authController");


router.get("/login", authRouter.login);
router.get("/register", authRouter.register);
router.get("/newpassword", authRouter.newpassword);
router.get("/recoverpassword", authRouter.recoverpassword);


module.exports = router;