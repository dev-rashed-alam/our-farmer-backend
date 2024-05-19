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
        const product = new Product({...req.body})
        product.slug = req.body.name.toLowerCase().split(' ').join('-');
        let data = new Product({
            ...req.body,
            slug: product.slug
        });
        await data.save();
        res.status(200).json({
            message: "Save successful!",
            data
        })
    } catch (error) {
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