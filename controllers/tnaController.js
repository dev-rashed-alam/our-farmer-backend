const {setCommonError} = require("../middlewares/common/errorHandler");
const {ProductPhase, PhaseActivity, ProductTna} = require("../models/ProductTNA");


const saveTnaMasterData = async (req, res, next) => {
    try {
        const newPhase = new ProductPhase({
            title: req.body.title,
            createdBy: req.loggedInUser.id
        })
        await newPhase.save();

        const activityPromises = req.body.activityList?.map(async (item) => {
            const activity = new PhaseActivity({
                name: item,
                phase: newPhase.id,
                createdBy: req.loggedInUser.id
            })
            await activity.save()
        })
        await Promise.all(activityPromises);
        res.status(200).json({
            message: "Save successful!"
        })
    } catch (error) {
        console.log(error)
        setCommonError(error)
    }
}

const getTnaMasterData = async (req, res, next) => {
    try {
        const activityList = await PhaseActivity.find().populate("Product_Phase");
        res.status(200).json({
            message: "Save successful!",
            data: activityList
        })
    } catch (error) {
        console.log(error)
        setCommonError(error)
    }
}

const saveProductTna = async (req, res, next) => {
    try {
        const isTnaExist = ProductTna.findOne({serviceInfo: req.body.serviceId})
        if (!isTnaExist._id) {
            const activityList = await PhaseActivity.find();
            const productTna = new ProductTna({
                serviceInfo: req.body.serviceId,
                activity: activityList.map(item => item._id),
                requestedUser: req.body.requestedUser,
                createdBy: req.loggedInUser.id
            })
            await productTna.save();
        }
        res.status(200).json({
            message: "Save successful!"
        })
    } catch (error) {
        console.log(error)
        setCommonError(error)
    }
}

const getProductTnaByUser = async (req, res, next) => {
    try {
        const productTna = await ProductTna.find({requestedUser: req.loggedInUser.id}).populate({
            path: 'serviceInfo',
            populate: {
                path: 'productCatalog'
            }
        });
        res.status(200).json({
            message: "Save successful!",
            data: productTna
        })
    } catch (error) {
        console.log(error)
        setCommonError(error)
    }
}

const getProductTnaById = async (req, res, next) => {
    try {
        const productTna = await ProductTna.findOne({ _id: req.params.id })
            .populate('serviceInfo')
            .populate('createdBy')
            .populate('requestedUser')
            .populate({
                path: "activity",
                populate: {
                    path: "phase"
                }
            })
        res.status(200).json({
            message: "Save successful!",
            data: productTna
        })
    } catch (error) {
        console.log(error)
        setCommonError(error)
    }
}

module.exports = {saveTnaMasterData, getTnaMasterData, saveProductTna, getProductTnaById, getProductTnaByUser}