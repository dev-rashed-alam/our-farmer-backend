const AreaInfo = require("../models/AreaInfo");
const {setCommonError} = require("../middlewares/common/errorHandler");
const {ProductCatalog, ProductCategory} = require("../models/ProductCatalog");
const {productStages, parseDate} = require("../utilities/helper");

const saveAreaInfo = async (req) => {
    const area = new AreaInfo({
        ...req.body,
        status: "LAND_INFO_ADDED"
    })
    await area.save();
    return area;
}


const saveProductInfo = async (req) => {
    const productCatalog = new ProductCatalog({
        ...req.body,
        farmingStartDate: parseDate(req.body.farmingStartDate),
        farmingEndDate: parseDate(req.body.farmingEndDate),
    })
    await productCatalog.save();
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

const getAllCatalog = async (req, res, next) => {
    try {
        const data = await ProductCatalog.find().populate("areaInfo", "divisionId districtId subDistrictId, mouzaId description").populate("productCategory", "name");
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
        const data = await ProductCatalog.findOne({"_id": req.params.id});
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
    getCatalogById
}