const express = require("express");
const authMiddleware = require("../middlewares/common/authMiddleware");
const {getAllNotification, changeNotificationStatus} = require("../controllers/notificationController");
const router = express.Router();

router.get("/all", authMiddleware, getAllNotification)
router.get("/change-status/:id/:read", authMiddleware, changeNotificationStatus)

module.exports = router;