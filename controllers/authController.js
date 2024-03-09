const bcrypt = require("bcrypt")
const {setCommonError} = require("../middlewares/common/errorHandler");
const User = require("../models/User")
const doUserRegistration = async (req, res, next) => {
    try {
        const {firstName, lastName, email, phoneNumber, password, userType} = req.body
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = new User({
            firstName,
            lastName,
            email,
            phoneNumber,
            password: hashedPassword,
            userType
        });
        await newUser.save();
        res.status(200).json({
            message: "Registration successful!"
        })
    } catch (error) {
        setCommonError(error)
    }
}

module.exports = {
    doUserRegistration
}