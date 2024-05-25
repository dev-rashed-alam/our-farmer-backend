const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    data: {type: Object, required: true},
    userType: {type: String, required: true},
    read: {type: Boolean, default: false},
    createdBy: {type: mongoose.Types.ObjectId, ref: "User"},
    userId: {type: mongoose.Types.ObjectId, ref: "User"}
}, {timestamps: true});

module.exports = mongoose.model('Notification', notificationSchema);
