const express = require("express");
const router = express.Router();

const authenticate = require("../middleware/authenticate.js");

const ratingController = require("../controller/rating.controller.js");

// router.post("/create", authenticate, ratingController.createRating);
// router.get("/product/:productId", authenticate, ratingController.getAllRating);


router.get("/product/:productId", ratingController.getAllRating);
router.post("/create", authenticate, ratingController.createRating);
router.put("/update", authenticate, ratingController.updateRating);
router.delete("/delete/:productId", authenticate, ratingController.deleteRating);

module.exports = router;