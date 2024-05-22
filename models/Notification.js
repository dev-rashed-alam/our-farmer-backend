const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    userId: {type: String, required: true},
    data: {type: Object, required: true},
    userType: {type: Object, required: true},
    read: {type: Boolean, default: false},
    createdBy: {type: mongoose.Types.ObjectId, ref: "User"}
}, {timestamps: true});

module.exports = mongoose.model('Notification', notificationSchema);
