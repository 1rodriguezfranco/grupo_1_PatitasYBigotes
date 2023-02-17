// ************ Require's ************
const express = require("express");
const router = express.Router();
const path = require("path");
// ************ Requiriendo middleware de Multer ************
const upload = require(path.join(__dirname, '../middlewares/multer'));
// ************ Requiriendo middleware de Validaciones del Register ************
const validations = require(path.join(__dirname, '../middlewares/validationRegister'));
// ************ Controller Require ************
const authRouter = require("../controllers/authController");


router.get("/login", authRouter.login);
// router.get("/register2", authRouter.register2);

/*** Register ***/
router.get("/register", authRouter.register);
router.post("/register", upload.single("avatar"), validations, authRouter.store);

router.get("/newpassword", authRouter.newpassword);
router.get("/recoverpassword", authRouter.recoverpassword);


module.exports = router;