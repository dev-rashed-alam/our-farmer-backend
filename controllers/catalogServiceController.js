const {setCommonError} = require("../middlewares/common/errorHandler");
const CatalogService = require("../models/CatalogService");
const {parseDate} = require("../utilities/helper");
const {saveNotification, deleteNotifications} = require("./notificationController");

const saveServiceInfo = async (req) => {
    const newService = new CatalogService({
        ...req.body,
        productionStartDate: parseDate(req.body.productionStartDate),
        productionEndDate: parseDate(req.body.productionEndDate),
        createdBy: req.loggedInUser.id
    })
    await newService.save();
    const catalogService = await CatalogService.findById(newService.id).populate('productCatalog').populate('createdBy');
    await saveNotification({
        userId: catalogService.createdBy,
        loggedInUser: req.loggedInUser,
        userType: "ADMIN",
        data: {
            entity: "SERVICE",
            title: `A new service of ${catalogService.serviceType.label} for ${catalogService.productCatalog.productTitle} is added`,
            createdAt: catalogService.createdAt,
            entityId: catalogService._id
        }
    })
    return catalogService;
}

const updateServiceInfo = async (req) => {
    const postData = {...req.body};
    return CatalogService.findOneAndUpdate({_id: req.params.id},
        {$set: postData}).populate("productCatalog").populate("createdBy");
}

const saveCatalogService = async (req, res, next) => {
    try {
        let data = await saveServiceInfo(req)
        res.status(200).json({
            message: "Save successful!",
            data
        })
    } catch (error) {
        console.log(error)
        setCommonError(error)
    }
}

const updateCatalogService = async (req, res, next) => {
    try {
        let stage = req.params.stage;
        let data = await updateServiceInfo(req)
        res.status(200).json({
            message: "Save successful!",
            data
        })
    } catch (error) {
        console.log(error)
        setCommonError(error)
    }
}

const getAllCatalogService = async (req, res, next) => {
    try {
        const data = await CatalogService.find().populate("productCatalog").populate("createdBy");
        res.status(200).json({
            message: "Successful!",
            data
        })
    } catch (error) {
        console.log(error)
        setCommonError(error)
    }
}

const getAllCatalogServiceByUser = async (req, res, next) => {
    try {
        const data = await CatalogService.find({createdBy: req.loggedInUser.id}).populate("productCatalog").populate("createdBy");
        res.status(200).json({
            message: "Successful!",
            data
        })
    } catch (error) {
        console.log(error)
        setCommonError(error)
    }
}

const getCatalogServiceById = async (req, res, next) => {
    try {
        const data = await CatalogService.findOne({"_id": req.params.id}).populate({
            path: 'productCatalog',
            populate: {
                path: 'productCategory'
            }
        }).populate("createdBy");
        res.status(200).json({
            message: "Successful!",
            data
        })
    } catch (error) {
        console.log(error)
        setCommonError(error)
    }
}

const getCatalogServiceByStatus = async (req, res, next) => {
    try {
        const data = await CatalogService.find({status: req.params.status}).populate({
            path: 'productCatalog',
            populate: {
                path: 'productCategory'
            }
        }).populate("createdBy");
        res.status(200).json({
            message: "Successful!",
            data
        })
    } catch (error) {
        console.log(error)
        setCommonError(error)
    }
}

const changeCatalogServiceStatus = async (req, res, next) => {
    try {
        await CatalogService.findOneAndUpdate({_id: req.params.id}, {$set: {status: req.params.status}});
        const catalogService = await CatalogService.findOne({_id: req.params.id}).populate("productCatalog").populate("createdBy");
        await saveNotification({
            userId: catalogService.createdBy,
            loggedInUser: req.loggedInUser,
            userType: "FARMER",
            data: {
                entity: "SERVICE",
                title: `Your Service of ${catalogService.serviceType.label} for ${catalogService.productCatalog.productTitle} is  ${catalogService.status === "APPROVE" ? "Approved" : "Rejected"}`,
                createdAt: catalogService.createdAt,
                entityId: catalogService._id
            }
        })
        res.status(200).json({
            message: "Successful!",
            data: catalogService
        })
    } catch (error) {
        console.log(error)
        setCommonError(error)
    }
}

const removeCatalogService = async (req, res, next) => {
    try {
        const catalogService = await CatalogService.findOneAndDelete({_id: req.params.id}).populate('productCatalog')

        await saveNotification({
            userId: catalogService.createdBy,
            loggedInUser: req.loggedInUser,
            userType: "FARMER",
            data: {
                entity: "SERVICE",
                title: `Your Service of ${catalogService.serviceType.label} for ${catalogService.productCatalog.productTitle} is deleted`,
                createdAt: catalogService.createdAt,
                entityId: null
            }
        })
        await deleteNotifications(catalogService._id, "SERVICE")
        res.status(200).json({
            message: "successful",
        });
    } catch (error) {
        console.log(error)
        setCommonError(error)
    }
}

module.exports = {
    removeCatalogService,
    changeCatalogServiceStatus,
    getCatalogServiceById,
    getAllCatalogServiceByUser,
    getAllCatalogService,
    updateCatalogService,
    saveCatalogService,
    getCatalogServiceByStatus
}
