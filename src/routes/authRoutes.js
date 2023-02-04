// ************ Require's ************
const express = require("express");
const router = express.Router();
const path = require("path");
const multer = require("multer");

// ************ Configuracion de Multer ************
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb (null, path.join(__dirname, "../../public/images"));
    },

    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb (null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
  })

const upload = multer({ storage: storage })
// --------------------------------------------------------------------------------------------

// ************ Controller Require ************
const authRouter = require("../controllers/authController");

router.get("/login", authRouter.login);
// router.get("/register2", authRouter.register2);

/*** Register ***/
router.get("/register", authRouter.register);
router.post("/register", upload.single("user_image"), authRouter.store);

router.get("/newpassword", authRouter.newpassword);
router.get("/recoverpassword", authRouter.recoverpassword);


module.exports = router;