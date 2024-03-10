const express = require('express')
const appRouter = express.Router()
const authRouter = require("./authRouter")
const farmerRouter = require("./farmerRouter")

appRouter.use("/auth", authRouter);
appRouter.use("/farmer", farmerRouter);

module.exports = appRouter;

