const express = require("express");
const router = express.Router();

const orderController = require("../controller/adminOrder.controller.js");
const authenticate = require("../middleware/authenticate.js");



router.get("/", authenticate ,orderController.getAllOrders);
router.put("/:orderId/confirmed", authenticate ,orderController.confirmedOrders);
router.put("/:orderId/shipped", authenticate ,orderController.shippOrders);
router.put("/:orderId/outtodeliver", authenticate ,orderController.outdeliverOrder);
router.put("/:orderId/delivered", authenticate ,orderController.deliverOrders);
router.put("/:orderId/cancelled", authenticate ,orderController.cancelledOrders);
router.delete("/:orderId/deleted", authenticate ,orderController.deleteorders);




module.exports = router;