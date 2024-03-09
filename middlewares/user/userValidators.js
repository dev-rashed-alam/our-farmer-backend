const {check, validationResult} = require("express-validator")
const User = require("../../models/User")
const createError = require("http-errors");

const addUserValidators = [
    check("firstName").trim().notEmpty().withMessage("Fist name is required"),
    check("lastName").trim().notEmpty().withMessage("Last name in required"),
    check("email").trim().optional().isEmail().withMessage("Invalid email address"),
    check("phoneNumber").trim().notEmpty().withMessage("Phone number is required").custom(async (value) => {
        try {
            const user = await User.findOne({phoneNumber: value});
            if (user) throw createError("Phone number already is use!");
        } catch (err) {
            throw createError(err.message);
        }
    }),
    check("password").trim().notEmpty().withMessage("Password is required")
]

const doUserValidation = (req, res, next) => {
    const errors = validationResult(req);
    const mappedErrors = errors.mapped();

    if (Object.keys(mappedErrors).length === 0) next();
    res.status(403).json({
        errors: mappedErrors
    })
}

module.exports = {
    addUserValidators, doUserValidation
}