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
        const productTna = new ProductTna({
            serviceInfo: req.body.serviceId,
            activity: req.body.activity,
            requestedUser: req.body.requestedUser,
            createdBy: req.loggedInUser.id
        })
        await productTna.save();
        res.status(200).json({
            message: "Save successful!",
            data: productTna
        })
    } catch (error) {
        console.log(error)
        setCommonError(error)
    }
}

const getProductTnaByUser = async (req, res, next) => {
    try {
        const productTna = ProductTna.findOne({requestedUser: req.params.userId});
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
        const productTna = ProductTna.findOne({_id: req.params.id});
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