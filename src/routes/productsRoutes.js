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
router.get('/create', productsController.create);
router.post('/create', upload.single("image"), validationsProductCreate, productsController.store);

/*** EDIT ONE PRODUCT ***/
router.get('/edit/:id', productsController.edit);
router.put('/edit/:id', upload.single("image"), validationsProductEdit, productsController.update);

/*** DELETE ONE PRODUCT***/ 
router.get("/details/:id", productsController.details);
router.delete('/details/:id', productsController.destroy); 

router.get("/list", productsController.list);

router.get("/:pet", productsController.listByPet);
router.get("/brands/:id", productsController.listByBrand);

router.get("/perro/:category", productsController.listByCategoryPerro);
router.get("/gato/:category", productsController.listByCategoryGato);
router.get("/roedor/:category", productsController.listByCategoryRoedor);
router.get("/ave/:category", productsController.listByCategoryAve);


module.exports = router;