const express = require("express");
const {getSummary} = require("../controllers/dashboardController");
const router = express.Router();

router.get("/admin/summary", getSummary)

module.exports = router;