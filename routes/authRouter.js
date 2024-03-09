const express = require("express");
const {doUserRegistration, doUserLogin} = require("../controllers/authController");
const {addUserValidators, doUserValidation} = require("../middlewares/user/userValidators");
const {addLoginValidators, validateConfirmPassword} = require("../middlewares/auth/authValidators");
const {doInputValidation} = require("../middlewares/common/errorHandler");
const avatarUpload = require("../middlewares/user/avatarUpload");

const router = express.Router();

router.post("/registration", avatarUpload, addUserValidators, validateConfirmPassword, doUserValidation, doUserRegistration)
router.post("/login", addLoginValidators, doInputValidation, doUserLogin)

module.exports = router;