const mongoose = require("mongoose")

const landInfo = mongoose.Schema({
    landArea: {
        type: mongoose.Types.ObjectId,
        ref: "Area_Info"
    },
    khatianNumber: {
        type: String,
        required: true,
        trim: true
    },
    areaSize: {
        type: String,
        required: true,
        trim: true
    },
    sizeType: {
        type: String,
        enum: ['SATAK', 'DECIMAL', "SHOTANGSHO"],
        default: 'SATAK'
    },
    description: {
        type: String,
        trim: true
    },
    status: {
        type: String,
        enum: ["PENDING", "APPROVED", "REJECT", "PROCESSING", "HOLD"],
        default: "PENDING"
    },
    landOwner: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    }
}, {timestamps: true})

const LandInfo = mongoose.model("Land_Info", landInfo);

module.exports = LandInfo