const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/authenticate.js");
const salesController = require("../controller/sales.controller.js");

router.get("/", authenticate, salesController.getSalesData);

module.exports = router;