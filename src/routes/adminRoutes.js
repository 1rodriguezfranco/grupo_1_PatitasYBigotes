const express = require("express");
const router = express.Router();
const adminRouter = require("../controllers/adminController");

router.get("/createproduct", adminRouter.createProduct);
router.get("/editproduct", adminRouter.editProduct);


module.exports = router;