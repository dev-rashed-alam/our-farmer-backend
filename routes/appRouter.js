const express = require('express')
const appRouter = express.Router()
const authRouter = require("./authRouter")

appRouter.use("/auth", authRouter);

module.exports = appRouter;

