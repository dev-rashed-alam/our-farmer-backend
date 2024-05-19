const express = require('express')
const { getAllProducts } = require("../controllers/consumerController");
const {createProduct} = require("../controllers/productController");
const {createOrder, getOrders} = require("../controllers/orderController");
const {createOrderValidation} = require("../middlewares/order/orderValidation");
const validationHandler = require("../middlewares/common/validationHandler");
const router = express.Router()

router.get("/products", getAllProducts);
router.get("/orders", getOrders);
router.post("/orders", createOrderValidation, validationHandler, createOrder);

module.exports = router;

