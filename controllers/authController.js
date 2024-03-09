const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const {setCommonError} = require("../middlewares/common/errorHandler");
const User = require("../models/User")
const doUserRegistration = async (req, res, next) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        let newUser;
        if (req.files && req.files.length > 0) {
            const avatarLocation = process.env.APP_URL + "uploads/avatars/";
            newUser = new User({
                ...req.body,
                avatar: avatarLocation + req.files[0].filename,
                password: hashedPassword,
            });
        } else {
            newUser = new User({
                ...req.body,
                password: hashedPassword,
            });
        }
        await newUser.save();
        res.status(200).json({
            message: "Registration successful!"
        })
    } catch (error) {
        setCommonError(error)
    }
}

const doUserLogin = async (req, res, next) => {
    try {
        const user = await User.findOne({email: req.body.email})
        if (user._id) {
            const isValidPassword = await bcrypt.compare(req.body.password, user.password);
            if (isValidPassword) {
                const userObj = {
                    id: user._id,
                    email: user.email,
                    userType: user.userType,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    phoneNumber: user.phoneNumber
                }
                const token = jwt.sign(userObj, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRY})
                res.status(200).json({
                    access_token: token,
                    data: userObj,
                    message: "Login Successful!"
                })
            } else {
                setCommonError(res, {message: "Login Failed! Please try again.", status: 401})
            }
        } else {
            setCommonError(res, {message: "Login Failed! Please try again.", status: 401})
        }
    } catch (error) {
        setCommonError(res, error)
    }
}

module.exports = {
    doUserRegistration,
    doUserLogin
}