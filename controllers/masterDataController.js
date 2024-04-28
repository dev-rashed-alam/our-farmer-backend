const CountryMasterData = require("../models/CountryMasterData")
const {setCommonError} = require("../middlewares/common/errorHandler");

const addCountryMasterData = async (req, res, next) => {
    try {
        const countryMasterData = new CountryMasterData({...req.body})
        const data = await countryMasterData.save();
        res.status(200).json({
            message: "Save successful!",
            data
        })
    } catch (error) {
        setCommonError(error)
    }
}

const getAllCountryMasterData = async (req, res, next) => {
    try {
        const data = await CountryMasterData.find();
        res.status(200).json({
            message: "Successful!",
            data
        })
    } catch (error) {
        setCommonError(error)
    }
}

module.exports = {
    addCountryMasterData,
    getAllCountryMasterData
}