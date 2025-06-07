const express = require("express");
const router = express.Router();
const userController = require("../controller/user.controller.js");
const authenticate = require("../middleware/authenticate.js");

router.get("/profile", userController.getUserProfile);
router.get("/", authenticate,userController.getAllUsers);
router.post("/initiate-signup", userController.initiateSignup);
router.post("/signup", userController.completeSignup);
router.post("/forgot-password", userController.forgotPassword); 
router.post("/reset-password", userController.resetPassword);
router.put("/:userId/role",authenticate,userController.updateUserRole );
  


module.exports = router;