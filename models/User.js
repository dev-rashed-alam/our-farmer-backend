const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        trim: true
    },
    phoneNumber: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
    },
    avatar: {
        type: String
    },
    userType: {
        type: String,
        enum: ["ADMIN", "SUPERVISOR", "FARMER", "CONSUMER"],
        default: "FARMER"
    },
    status: {
        type: String,
        enum: ["PENDING", "APPROVED", "HOLD", "REJECTED"],
        default: "PENDING"
    }
}, {timestamps: true});

const User = mongoose.model("User", userSchema)

module.exports = User