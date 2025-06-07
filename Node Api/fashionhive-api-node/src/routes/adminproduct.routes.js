const express = require("express");
const router = express.Router();

const authenticate = require("../middleware/authenticate.js");

const productController = require("../controller/product.controller.js");


router.post("/", authenticate, productController.createProduct);
router.post("/creates", authenticate, productController.createMultipleProducts);
router.delete("/:id/delete", authenticate, productController.deleteProduct);
router.put("/:id", authenticate, productController.updateProduct);

module.exports = router;