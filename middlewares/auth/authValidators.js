const {check} = require("express-validator")

const addLoginValidators = [
    // check("userType").trim().notEmpty().withMessage("User type is required"),
    check("password").trim().notEmpty().withMessage("Password is required"),
    (req, res, next) => {
        const userType = req.body.userType;
        // if (userType === "ADMIN") {
        //     check("email").trim().notEmpty().withMessage("Email is required").isEmail().withMessage("Invalid email address")(req, res, next);
        // } else {
        check("phoneNumber").trim().notEmpty().withMessage("Phone number is required")(req, res, next);
        // }
    }
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
