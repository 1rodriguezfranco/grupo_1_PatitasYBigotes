const express = require("express");
const router = express.Router();
const path = require("path");
/* Requiriendo middleware de Multer */
const upload = require(path.join(__dirname, '../middlewares/multers/multerUserAvatar'));
/* Requiriendo middleware de Validaciones del Register */
const validationsRegister = require(path.join(__dirname, '../middlewares/validations/validationRegister'));
/* Requiriendo middleware de Validaciones del Login */
const validationsLogin = require(path.join(__dirname, '../middlewares/validations/validationLogin'));
/* Requiriendo middlewater de Usuario Loggeado*/
const authUserLogged = require(path.join(__dirname, '../middlewares/auths/userLogged'));
/* Requiriendo middlewater de Usuario NO Loggeado*/
const authUserNotLogged = require(path.join(__dirname, '../middlewares/auths/userNotLogged'));
/* Controller Require */
const authRouter = require("../controllers/authController");


/*** Register ***/
router.get("/register", authUserLogged, authRouter.register);
router.post("/register", upload.single("avatar"), validationsRegister, authRouter.store);
// router.get("/register2", authRouter.register2);

/* Login */
router.get("/login", authUserLogged, authRouter.login);
router.post("/login", validationsLogin, authRouter.loginProcess);

/* Perfil */
router.get("/profile", authUserNotLogged, authRouter.profile);
router.post("/profile", authUserNotLogged, authRouter.logout);

router.get("/newpassword", authRouter.newpassword);
router.get("/recoverpassword", authRouter.recoverpassword);


module.exports = router;