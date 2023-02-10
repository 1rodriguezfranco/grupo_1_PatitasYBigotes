const express = require("express");
const router = express.Router();
const mainRouter = require("../controllers/mainController");

router.get("/", mainRouter.index);
router.get("/carrito", mainRouter.carrito);
router.get("/productdetails/:id", mainRouter.productdetails);
router.get("/productList", mainRouter.productList)


module.exports = router;