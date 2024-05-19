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
const authMiddleware = require("../middlewares/common/authMiddleware");
const {saveTnaMasterData} = require("../controllers/tnaController");
const router = express.Router();

router.get("/users", authMiddleware, findAllUsers)
router.get("/user/:id", authMiddleware, getUserById)
router.put("/user/change-status/:id", authMiddleware, updateUserStatusById)
router.put(
    "/user/:id",
    authMiddleware,
    avatarUpload,
    validateConfirmPassword,
    validationHandler,
    updateUserById
);
router.delete("/delete/user/:id", authMiddleware, removeUserById)

router.post("/tna/save", authMiddleware, saveTnaMasterData)


module.exports = router;