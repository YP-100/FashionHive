const express = require("express");
const router = express.Router();
const feedbackController = require("../controller/feedback.controller.js");
const authenticate = require("../middleware/authenticate.js");

router.post("/", authenticate, feedbackController.createFeedback);
router.get("/", authenticate, feedbackController.getFeedback);
router.put("/", authenticate, feedbackController.updateFeedback);
router.delete("/", authenticate, feedbackController.deleteFeedback);

router.get("/all", authenticate, feedbackController.getAllFeedback);

module.exports = router;