const express = require("express");
const router = express.Router();

const authenticate = require("../middleware/authenticate.js");

const orderController = require("../controller/order.controller.js");


router.post("/", authenticate, orderController.createOrder);
router.get("/user", authenticate, orderController.OrderHistory);
router.get("/:id", authenticate, orderController.findOrderById);


module.exports = router;