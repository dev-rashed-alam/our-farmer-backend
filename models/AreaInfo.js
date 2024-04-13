const mongoose = require("mongoose")

const areaInfo = mongoose.Schema({
    divisionId: {type: Number, required: true},
    divisionName: {type: String, required: true},
    districtId: {type: Number, required: true},
    districtName: {type: String, required: true},
    subDistrictId: {type: Number, required: true},
    subDistrictName: {type: String, required: true},
    mouzaId: {type: Number, required: true},
    mouzaName: {type: String, required: true},
    description: {type: String, trim: true}
}, {timeStamps: true})

const AreaInfo = mongoose.model("Area_Info", areaInfo);

module.exports = AreaInfo