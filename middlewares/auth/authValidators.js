const {check} = require("express-validator")

const addLoginValidators = [
    check("email").trim().notEmpty().withMessage("Email is required").isEmail().withMessage("Invalid email address"),
    check("password").trim().notEmpty().withMessage("Password is required")
]

const validateConfirmPassword = [
    check("confirmPassword")
        .if(check("password"))
        .trim()
        .notEmpty()
        .withMessage("Confirm Password is required!")
        .custom(async (confirmPassword, {req}) => {
            const password = req.body.password;
            if (password !== confirmPassword) {
                throw new Error("Passwords must be same");
            }
        }),
];

module.exports = {
    addLoginValidators,
    validateConfirmPassword
}
