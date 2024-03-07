const express = require("express");
const registerController = require("../controllers/registerController.js");

const router = express.Router();

// register method
router.post("/register" , registerController.registerController);
router.post("/login" , registerController.loginController);

// forgot password
router.post("/forgotPassword" , registerController.forgotpasswordController);

// private route
router.get("/")

module.exports = router;