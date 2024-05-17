const express = require("express");
const {
    findAllUsers,
    getUserById,
    removeUserById,
    updateUserById,
    updateUserStatusById
} = require("../controllers/userController");
const validationHandler = require("../middlewares/common/validationHandler");
const {validateConfirmPassword} = require("../middlewares/auth/authValidators");
const avatarUpload = require("../middlewares/user/avatarUpload");
const router = express.Router();

router.get("/users", findAllUsers)
router.get("/user/:id", getUserById)
router.get("/delete/user", removeUserById)
router.put("/user/change-status/:id", updateUserStatusById)
router.put(
    "/user/:id",
    avatarUpload,
    validateConfirmPassword,
    validationHandler,
    updateUserById
);


module.exports = router;