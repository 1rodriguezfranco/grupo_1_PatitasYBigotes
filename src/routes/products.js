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
const productsController = require("../controllers/productsController");

/*** CREATE ONE PRODUCT ***/
router.get('/createproduct', productsController.create);
router.post('/createproduct', upload.single("product_image"), productsController.store);


/*** EDIT ONE PRODUCT ***/
router.get('/editproduct/:id', productsController.edit);
router.put('/editproduct/:id', upload.single("product_image"), productsController.update);


module.exports = router;