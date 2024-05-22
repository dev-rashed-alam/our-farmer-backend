const {check} = require("express-validator");

const createProductValidation = [
    check("name").trim().notEmpty().withMessage("Name is required"),
    check("price").trim().notEmpty().withMessage("Price is required"),
    check("description").trim().notEmpty().withMessage("Description is required"),
    check("stock").trim().notEmpty().withMessage("Stock is required"),
    check("discount").trim().notEmpty().withMessage("Discount is required"),
    check("isFeatured").trim().notEmpty().withMessage("Featured is required")
]

module.exports = {createProductValidation}