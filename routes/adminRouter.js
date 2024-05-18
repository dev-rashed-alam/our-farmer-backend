const express = require("express");
const {
    findAllUsers,
    getUserById,
    removeUserById,
    updateUserById,
    updateUserStatusById
} = require("../controllers/userController");
const {createProduct, updateProduct} = require("../controllers/productController");
const validationHandler = require("../middlewares/common/validationHandler");
const {validateConfirmPassword} = require("../middlewares/auth/authValidators");
const avatarUpload = require("../middlewares/user/avatarUpload");
const {createProductValidation} = require("../middlewares/product/productValidator");
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

//product
router.post("/products", createProductValidation, validationHandler, createProduct)
router.put("/product/:id", validationHandler, updateProduct)



module.exports = router;