const express = require("express");
const router = express.Router();
const {codeController} = require("../controllers/codeController.js");

router.post("/main/code" , codeController.saveCode);


module.exports = router;