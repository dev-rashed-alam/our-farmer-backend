const express = require('express')
const { getAllProducts } = require("../controllers/consumerController");
const {createProduct} = require("../controllers/productController");
const {createOrder, getOrders} = require("../controllers/orderController");
const {createOrderValidation} = require("../middlewares/order/orderValidation");
const validationHandler = require("../middlewares/common/validationHandler");
const authMiddleware = require("../middlewares/common/authMiddleware");
const {getAllCategories} = require("../controllers/catalogController");
const router = express.Router()

router.get("/products", getAllProducts);
router.get("/orders", getOrders);
router.post("/orders", createOrderValidation, validationHandler, createOrder);
router.get("/categories", getAllCategories)


module.exports = router;

