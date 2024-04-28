const mongoose = require("mongoose")

const areaInfo = mongoose.Schema({
    division: {type: Object, required: true},
    district: {type: Object, required: true},
    thana: {type: Object, required: true},
    mouza: {type: Object, required: true},
    khatianNumber: {type: String, required: true},
    areaSize: {type: String, required: true},
    sizeUnit: {type: Object, required: true},
    landAcquisitionType: {type: Object, required: true},
    legalAffairs: {type: Object, required: true},
    description: {type: String, trim: true},
    status: {type: String, trim: true}
}, {timeStamps: true})

const AreaInfo = mongoose.model("Area_Info", areaInfo);

module.exports = AreaInfo