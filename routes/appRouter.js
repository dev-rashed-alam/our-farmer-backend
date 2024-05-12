const express = require('express')
const appRouter = express.Router()
const authRouter = require("./authRouter")
const farmerRouter = require("./farmerRouter")
const adminRouter = require("./adminRouter")
const masterDataRouter = require("./masterDataRouter")

appRouter.use("/auth", authRouter);
appRouter.use("/farmer", farmerRouter);
appRouter.use("/admin", adminRouter);
appRouter.use("/master-data", masterDataRouter);

module.exports = appRouter;

