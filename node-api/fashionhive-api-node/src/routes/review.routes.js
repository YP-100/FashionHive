const express = require("express");
const router = express.Router();

const reviewController = require("../controller/review.controller.js");

const authenticate = require("../middleware/authenticate.js");


router.get("/product/:productId", reviewController.getAllReview);
router.get("/user/:userId", reviewController.getAllReviewsByUser);
router.post("/create/:productId", authenticate, reviewController.createReview);
router.delete("/delete/:reviewId", authenticate, reviewController.deleteReview);
router.put("/update/:reviewId", authenticate, reviewController.updateReview);


module.exports = router;


