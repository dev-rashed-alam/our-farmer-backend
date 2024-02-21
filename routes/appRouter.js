const express = require('express')
const appRouter = express.Router()

appRouter.get("/", (req, res, next) => {
    res.status(200).json({
        message: "Successful!"
    })
})

module.exports = appRouter;

