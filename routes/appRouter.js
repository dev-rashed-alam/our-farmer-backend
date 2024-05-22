const express = require('express')
const appRouter = express.Router()
const authRouter = require("./authRouter")
const farmerRouter = require("./farmerRouter")
const adminRouter = require("./adminRouter")
const masterDataRouter = require("./masterDataRouter")
const consumerRouter = require("./consumerRouter")
const notificationRouter = require("./notificationRouter")

appRouter.use("/auth", authRouter);
appRouter.use("/farmer", farmerRouter);
appRouter.use("/admin", adminRouter);
appRouter.use("/master-data", masterDataRouter);
appRouter.use("/consumer", consumerRouter);
appRouter.use("/notification", notificationRouter);

module.exports = appRouter;

