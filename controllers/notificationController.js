const {setCommonError} = require("../middlewares/common/errorHandler");
const Notification = require("../models/Notification")

const saveNotification = async (req) => {
    try {
        const notification = new Notification({
            ...req,
            read: false,
            createdBy: req.loggedInUser.id
        })
        await notification.save();
    } catch (error) {
        console.log(error)

        setCommonError(error)
    }
}

const getAllNotification = async (req, res, next) => {
    try {
        let notifications = [];
        if (req.loggedInUser.userType === "ADMIN") {
            notifications = await Notification.find({userType: "ADMIN"})
        } else {
            notifications = await Notification.find({userId: req.loggedInUser.id, userType: "FARMER"})
        }
        res.status(200).json({
            message: "Successful!",
            data: notifications
        })
    } catch (error) {
        setCommonError(error)
    }
}

const changeNotificationStatus = async (req, res, next) => {
    try {
        let notifications = await Notification.findOneAndUpdate({_id: req.params.id}, {$set: {read: req.params.read}})
        res.status(200).json({
            message: "Successful!",
            data: notifications
        })
    } catch (error) {
        setCommonError(error)
    }
}


module.exports = {
    saveNotification,
    getAllNotification,
    changeNotificationStatus
}