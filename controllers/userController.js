const User = require("../models/User");
const {setCommonError} = require("../middlewares/common/errorHandler");
const {removeUploadedFile} = require("../utilities/removeUploadedFileOrFolder");
const bcrypt = require("bcrypt");
const {removeEmptyValues} = require("../utilities/helper");

const findAllUsers = async (req, res, next) => {
    try {
        const data = await User.find({userType: req.query.userType});
        res.status(200).json({
            message: "Successful",
            data
        })
    } catch (error) {
        setCommonError(error)
    }
}

const getUserById = async (req, res, next) => {
    try {
        const data = await User.findOne({_id: req.params.id}, {__v: 0, password: 0});
        res.status(200).json({
            message: "Successful",
            data
        })
    } catch (error) {
        setCommonError(error)
    }
}

const removeUserById = async (req, res, next) => {
    try {
        const data = await User.findOneAndDelete({_id: req.params.id});
        res.status(200).json({
            message: "Successful",
            data
        })
    } catch (error) {
        setCommonError(error)
    }
}

const updateUserStatusById = async (req, res, next) => {
    try {
        const data = await User.findOneAndUpdate({_id: req.params.id}, {$set: req.body});
        res.status(200).json({
            message: "Successful",
            data
        })
    } catch (error) {
        setCommonError(error)
    }
}
const updateUserById = async (req, res, next) => {
    try {
        const postData = removeEmptyValues(req.body);
        if (req?.files?.[0]?.filename) {
            const avatarLocation = process.env.APP_URL + "uploads/avatars/";
            postData.avatar = avatarLocation + req.files[0].filename;
        }
        if (req.body?.password) {
            postData.password = await bcrypt.hash(req.body.password, 10);
        }

        const user = await User.findOneAndUpdate(
            {_id: req.params.id},
            {$set: postData}
        );
        if (req?.files?.[0]?.filename) {
            removeUploadedFile(user.avatar, "avatars");
        }
        const updatedUser = await User.findOne(
            {_id: req.params.id}
        );
        res.status(200).json({
            message: "Successful!",
            data: {
                id: updatedUser.id,
                firstName: updatedUser.firstName,
                lastName: updatedUser.lastName,
                email: updatedUser.email,
                avatar: updatedUser.avatar
            }
        });
    } catch (error) {
        console.log(error)
        setCommonError(res, error.message, 500);
    }
};

module.exports = {
    findAllUsers,
    removeUserById,
    getUserById,
    updateUserById,
    updateUserStatusById
}

