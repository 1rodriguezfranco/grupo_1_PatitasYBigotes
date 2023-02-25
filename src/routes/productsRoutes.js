const express = require("express");
const router = express.Router();
const path = require("path");
/* Requiriendo middleware de Multer */
const upload = require(path.join(__dirname, '../middlewares/multers/multerProductImage'));
/* Requiriendo middleware de Validaciones del ProductCreate */
const validationsProductCreate = require(path.join(__dirname, '../middlewares/validations/validationProductCreate'));
/* Requiriendo middleware de Validaciones del ProductEdite */
const validationsProductEdit = require(path.join(__dirname, '../middlewares/validations/validationProductEdit'));
/* Controller Require */
const productsController = require("../controllers/productsController");


/*** CREATE ONE PRODUCT ***/
router.get('/createproduct', productsController.create);
router.post('/createproduct', upload.single("product_image"), validationsProductCreate, productsController.store);


/*** EDIT ONE PRODUCT ***/
router.get('/editproduct/:id', productsController.edit);
router.put('/editproduct/:id', upload.single("product_image"), validationsProductEdit, productsController.update);


module.exports = router;