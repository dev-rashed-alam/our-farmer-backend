const Product = require("../models/Product")
const {setCommonError} = require("../middlewares/common/errorHandler");

const getAllProducts = async (req, res, next) => {
    try {
        const data = await Product.find().populate("category");
        res.status(200).json({
            message: "Successful!",
            data
        })
    } catch (error) {

        setCommonError(error)
    }
}

module.exports = {
    getAllProducts,
}