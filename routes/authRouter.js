const express = require("express");
const {doUserRegistration} = require("../controllers/authController");
const {addUserValidators, doUserValidation} = require("../middlewares/user/userValidators");

const router = express.Router();

router.post("/registration", addUserValidators, doUserValidation, doUserRegistration)

module.exports = router;