const Product = require("../models/Product")
const {setCommonError} = require("../middlewares/common/errorHandler");

const getAllProducts = async (req, res, next) => {
    try {
        const data = await Product.find();
        res.status(200).json({
            message: "Successful!",
            data
        })
    } catch (error) {
        setCommonError(error)
    }
}

const createProduct = async (req, res, next) => {
    try {
        const postData = req.body
        if (req?.files?.[0]?.filename) {
            const productLocation = process.env.APP_URL + "uploads/products/";
            postData.image = productLocation + req.files[0].filename;
        }

        let slug = req.body.name.toLowerCase().split(' ').join('-');
        let data = new Product({
            ...postData,
            slug: slug
        });
        await data.save();
        res.status(200).json({
            message: "Save successful!",
            data
        })
    } catch (error) {
        console.log(error)
        setCommonError(error)
    }
}

const updateProduct = async (req, res, next) => {
    try {
        let slug = req.body.name.toLowerCase().split(' ').join('-') || req.body.slug;
        const product = await Product.findOneAndUpdate({
            _id: req.params.id
        }, {
            $set: req.body,
            slug
        });

        res.status(200).json({
            message: "Update successful!",
            product
        })
    } catch (error) {
        console.log(error)
        setCommonError(error)
    }
}

module.exports = {
    getAllProducts,
    createProduct,
    updateProduct
}