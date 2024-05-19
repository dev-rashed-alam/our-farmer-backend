const Order = require("../models/Order")
const {setCommonError} = require("../middlewares/common/errorHandler");
const {doUserRegistration} = require("./authController");
const User = require("../models/User");
const bcrypt = require("bcrypt");

const getOrders = async (req, res, next) => {
    try {
        let query = {};
        if (req.query.phone) {
            query.phone = req.query.phone
        }
        if (req.query.trackingNumber) {
            query.trackingNumber = req.query.trackingNumber
        }
        if (req.query.status) {
            query.isDelivered = req.query.status
        }
        const data = await Order.find(query);
        res.status(200).json({
            message: "Successful!",
            data
        })
    } catch (error) {
        setCommonError(error)
    }
}

const createOrder = async (req, res, next) => {
    try {
        const order = new Order({...req.body})
        let newUser;
        let data = new Order({
            ...req.body
        });
        await data.save();
        if (req.body.isCreateAccount) {
            const hashedPassword = await bcrypt.hash("123456", 10)
            newUser = new User({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                phoneNumber: req.body.phone,
                password: hashedPassword,
                userType: "CONSUMER",
                status: "APPROVED",
                address: req.body.address
            });
            await newUser.save();

        }
        res.status(200).json({
            message: "Save successful!",
            data,
            newUser
        })
    } catch (error) {
        console.log(error)
        setCommonError(error)
    }
}

const updateOrderStatus = async (req, res, next) => {
    try {
        const data = await Order.findByIdAndUpdate(req.params.id,
            {
                isDelivered: "DELIVERED",
                deliveredAt: Date.now(),
                isPaid: true,
                paidAt: Date.now()
            },
            {
                new: true
            });
        res.status(200).json({
            message: "Update successful!",
            data
        })
    } catch (error) {
        setCommonError(error)
    }
}

const getSingleOrder = async (req, res, next) => {
    try {
        const data = await Order.findById(req.params.id);
        res.status(200).json({
            message: "Successful!",
            data
        })
    }
    catch (error) {
        setCommonError(error)
    }
}


module.exports = {
    getOrders,
    createOrder,
    updateOrderStatus,
    getSingleOrder

}