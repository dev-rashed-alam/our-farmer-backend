const {check, validationResult} = require("express-validator")
const User = require("../../models/User")
const createError = require("http-errors");
const {removeUploadedFile} = require("../../utilities/removeUploadedFileOrFolder");

const addUserValidators = [
    check("firstName").trim().notEmpty().withMessage("Fist name is required"),
    check("lastName").trim().notEmpty().withMessage("Last name in required"),
    check("email").trim().optional().isEmail().withMessage("Invalid email address"),
    check("phoneNumber").trim().notEmpty().isLength({
        min: 11,
        max: 11
    }).withMessage("Phone number is required").custom(async (value) => {
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

    if (Object.keys(mappedErrors).length === 0) {
        next()
    } else {
        if (req.files?.length > 0) {
            const {filename} = req.files[0];
            removeUploadedFile(filename, "avatars");
        }
        res.status(403).json({
            errors: mappedErrors
        })
    }
}

module.exports = {
    addUserValidators, doUserValidation
}