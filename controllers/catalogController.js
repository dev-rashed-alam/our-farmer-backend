const AreaInfo = require("../models/AreaInfo");
const {setCommonError} = require("../middlewares/common/errorHandler");
const {ProductCatalog, ProductCategory} = require("../models/ProductCatalog");
const {productStages, parseDate} = require("../utilities/helper");
const createError = require("http-errors");
const User = require("../models/User")

const saveAreaInfo = async (req) => {
    const area = new AreaInfo({
        ...req.body,
        stage: "LAND_INFO_ADDED"
    })
    await area.save();
    return area;
}

const updateAreaInfo = async (req) => {
    const postData = {...req.body};
    const area = await AreaInfo.findOneAndUpdate({_id: req.params.id},
        {$set: postData})
    return area;
}

const getRandomUser = async () => {
    try {
        return await User.aggregate([{$match: {userType: {$in: ["ADMIN", "SUPERVISOR"]}}}, {$sample: {size: 1}}]);
    } catch (err) {
        throw createError(err.message);
    }
}


const saveProductInfo = async (req) => {
    const superVisor = await getRandomUser();
    const productCatalog = new ProductCatalog({
        ...req.body,
        superVisor: superVisor[0],
        farmingStartDate: parseDate(req.body.farmingStartDate),
        farmingEndDate: parseDate(req.body.farmingEndDate),
        stage: "PRODUCT_INFO_ADDED"
    })
    await productCatalog.save();
    const populatedProduct = await ProductCatalog.findById(productCatalog.id).populate('superVisor');
    return populatedProduct;

}

const updateProductInfo = async (req) => {
    const postData = {...req.body};
    const productCatalog = await ProductCatalog.findOneAndUpdate({_id: req.params.id},
        {$set: postData}).populate("superVisor")
    return productCatalog;
}
const saveProductCategory = async (req, res, next) => {
    try {
        const productCategory = new ProductCategory({
            ...req.body,
        })
        const data = await productCategory.save();
        res.status(200).json({
            message: "Save successful!",
            data
        })
    } catch (error) {
        console.log(error)
        setCommonError(error)
    }
}

const saveCatalog = async (req, res, next) => {
    try {
        let stage = req.params.stage;
        let data = null;
        if (stage === productStages.AREA_INFO) {
            data = await saveAreaInfo(req)
        }
        if (stage === productStages.PRODUCT_INFO) {
            data = await saveProductInfo(req);
        }
        res.status(200).json({
            message: "Save successful!",
            data
        })
    } catch (error) {
        console.log(error)
        setCommonError(error)
    }
}
const updateCatalog = async (req, res, next) => {
    try {
        let stage = req.params.stage;
        let data = null;
        if (stage === productStages.AREA_INFO) {
            data = await updateAreaInfo(req)
        }
        if (stage === productStages.PRODUCT_INFO) {
            data = await updateProductInfo(req);
        }
        res.status(200).json({
            message: "Save successful!",
            data
        })
    } catch (error) {
        console.log(error)
        setCommonError(error)
    }
}

const getAllCatalog = async (req, res, next) => {
    try {
        const data = await ProductCatalog.find().populate("areaInfo", "divisionId districtId subDistrictId, mouzaId description").populate("productCategory", "name").populate("superVisor");
        res.status(200).json({
            message: "Successful!",
            data
        })
    } catch (error) {
        console.log(error)
        setCommonError(error)
    }
}

const getCatalogById = async (req, res, next) => {
    try {
        const data = await ProductCatalog.findOne({"_id": req.params.id}).populate("areaInfo superVisor productCategory");
        res.status(200).json({
            message: "Successful!",
            data
        })
    } catch (error) {
        console.log(error)
        setCommonError(error)
    }
}

const getAllCategories = async (req, res, next) => {
    try {
        const data = await ProductCategory.find();
        res.status(200).json({
            message: "Successful!",
            data
        })
    } catch (error) {
        console.log(error)
        setCommonError(error)
    }
}

module.exports = {
    saveCatalog,
    saveProductCategory,
    getAllCatalog,
    getAllCategories,
    getCatalogById,
    updateCatalog
}