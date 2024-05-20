const express = require("express");
const {
    findAllUsers,
    getUserById,
    removeUserById,
    updateUserById,
    updateUserStatusById
} = require("../controllers/userController");
const {createProduct, updateProduct, getAllProducts} = require("../controllers/productController");
const validationHandler = require("../middlewares/common/validationHandler");
const {validateConfirmPassword} = require("../middlewares/auth/authValidators");
const avatarUpload = require("../middlewares/user/avatarUpload");
const authMiddleware = require("../middlewares/common/authMiddleware");
const {saveTnaMasterData,getTnaMasterData, getProductTnaByUser, getProductTnaById, saveProductTna} = require("../controllers/tnaController");
const {createProductValidation} = require("../middlewares/product/productValidator");
const {getOrders, updateOrderStatus, getSingleOrder} = require("../controllers/orderController");
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

router.get("/tna", authMiddleware, getTnaMasterData)
router.get("/tna/by-user", authMiddleware, getProductTnaByUser)
router.get("/tna/:id", authMiddleware, getProductTnaById)
router.post("/tna/master-data/save", authMiddleware, saveTnaMasterData)
router.post("/tna/save", authMiddleware, saveProductTna)

//product
router.get("/products", getAllProducts)
router.post("/products", createProductValidation, validationHandler, createProduct)
router.put("/product/:id", validationHandler, updateProduct)

//orders
router.get("/orders", getOrders)
router.get("/orders/:id", getSingleOrder)
router.put("/orders/:id", updateOrderStatus)



module.exports = router;