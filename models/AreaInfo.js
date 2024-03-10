const mongoose = require("mongoose")

const mouzaInfo = mongoose.Schema({name: {type: String, trim: true, unique: true, required: true}})

const subDistrictInfo = mongoose.Schema({
    name: {type: String, trim: true, unique: true, required: true},
    mouza: [mouzaInfo]
})

const districtInfo = mongoose.Schema({
    name: {type: String, trim: true, unique: true, required: true},
    subDistrict: [subDistrictInfo]
})

const areaInfo = mongoose.Schema({
    name: {type: String, trim: true, unique: true, required: true},
    district: [districtInfo]
}, {timeStamps: true})

const AreaInfo = mongoose.model("Area_Info", areaInfo);

module.exports = AreaInfo