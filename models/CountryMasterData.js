const mongoose = require("mongoose")

const countryMasterDataSchema = mongoose.Schema({
    divisionName: {
        type: String,
        required: true,
        trim: true
    },
    info: [{
        districtName: {
            type: String,
            required: true,
            trim: true
        },
        districtId: mongoose.Types.ObjectId,
        thana: [{
            thanaName: {
                type: String,
                required: true,
                trim: true
            },
            thanaId: mongoose.Types.ObjectId,
            mouzaInfo: [{
                mouzaName: {
                    type: String,
                    required: true,
                    trim: true
                },
                mouzaId: mongoose.Types.ObjectId
            }]
        }]
    }]
}, {timestamps: true})

const CountryMasterData = mongoose.model("Country_Master_Data", countryMasterDataSchema);

module.exports = CountryMasterData

