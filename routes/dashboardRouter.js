const express = require("express");
const {getSummary, getOrderSummary} = require("../controllers/dashboardController");
const router = express.Router();

router.get("/admin/summary", getSummary)
router.get("/admin/orderSummary", getOrderSummary)

module.exports = router;