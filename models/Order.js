const mongoose = require("mongoose")

const orderSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: false,
        trim: true,
        default: ""
    },
    email: {
        type: String,
        required: false,
        trim: true,
        default: ""
    },
    phone: {
        type: String,
        required: true,
        trim: true
    },
    address: {
        type: String,
        required: true,
        trim: true
    },
    city: {
        type: String,
        required: true,
        trim: true
    },
    state: {
        type: String,
        required: false,
        trim: true,
        default: ""
    },
    zip: {
        type: String,
        required: true,
        trim: true
    },
    country: {
        type: String,
        required: true,
        trim: true
    },
    paymentMethod: {
        type: String,
        required: false,
        trim: true,
        default: "COD"
    },
    orderItems: {
        type: Array,
        required: true
    },
    shippingPrice: {
        type: Number,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    },
    isPaid: {
        type: Boolean,
        default: false
    },
    paidAt: {
        type: Date,
        required: false
    },
    isDelivered: {
        type: String,
        enum: ["PENDING", "DELIVERED", "CANCELLED"],
        default: "PENDING"
    },
    deliveredAt: {
        type: Date,
        required: false
    },
    orderNote: {
        type: String,
        required: false,
        default: ""
    },
    trackingNumber: {
        type: String,
        required: false,
        default: ""
    },
    isCreateAccount: {
        type: Boolean,
        default: false
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: "User"
    },
}, {timestamps: true});

const Order = mongoose.model("Order", orderSchema)

module.exports = Order