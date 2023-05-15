const express = require("express");
const router = express.Router();
const path = require("path");
/* Requiriendo middleware de Multer */
const upload = require(path.join(__dirname, '../middlewares/multers/multerUserAvatar'));
/* Requiriendo middleware de Validaciones del Register */
const validationsRegister = require(path.join(__dirname, '../middlewares/validations/validationRegister'));
/* Requiriendo middleware de Validaciones del Login */
const validationsLogin = require(path.join(__dirname, '../middlewares/validations/validationLogin'));
/* Requiriendo middleware de Validaciones del Login */
const validationsEditUser = require(path.join(__dirname, '../middlewares/validations/validationEditUser'));
/* Requiriendo middlewater de Usuario Loggeado*/
const authUserLogged = require(path.join(__dirname, '../middlewares/auths/userLogged'));
/* Requiriendo middlewater de Usuario NO Loggeado*/
const authUserNotLogged = require(path.join(__dirname, '../middlewares/auths/userNotLogged'));
/* Controller Require */
const authController = require("../controllers/authController");


/*** Register ***/
router.get("/register", authUserLogged, authController.register);
router.post("/register", upload.single("avatar"), validationsRegister, authController.store);

/* Login */
router.get("/login", authUserLogged, authController.login);
router.post("/login", validationsLogin, authController.loginProcess);

/* Perfil */
router.get("/profile", authUserNotLogged, authController.profile);
router.post("/profile", authController.logout);

/* Editar */
router.get("/edit/:id", authUserNotLogged, authController.edit);
router.put("/edit/:id", upload.single("avatar"), validationsEditUser, authController.update);

router.get("/newpassword", authController.newpassword);
router.get("/recoverpassword", authController.recoverpassword);


module.exports = router;