const express = require('express')
const appRouter = express.Router()
const authRouter = require("./authRouter")
const farmerRouter = require("./farmerRouter")
const masterDataRouter = require("./masterDataRouter")

appRouter.use("/auth", authRouter);
appRouter.use("/farmer", farmerRouter);
appRouter.use("/master-data", masterDataRouter);

module.exports = appRouter;

