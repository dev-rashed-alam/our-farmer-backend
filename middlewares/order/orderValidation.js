const {check} = require("express-validator");

const createOrderValidation = [
    check("firstName").trim().notEmpty().withMessage("First Name is required"),
    check("phone").trim().notEmpty().withMessage("Phone is required"),
    check("address").trim().notEmpty().withMessage("Address is required"),
    check("city").trim().notEmpty().withMessage("City is required"),
    check("zip").trim().notEmpty().withMessage("Zip is required"),
    check("country").trim().notEmpty().withMessage("Country is required"),
    check("orderItems").isArray().withMessage("Order Items is required")
]

module.exports = {createOrderValidation}