const User = require("../models/User");
const {setCommonError} = require("../middlewares/common/errorHandler");

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

module.exports = {
    findAllUsers,
    removeUserById
}

