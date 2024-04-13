const mongoose = require("mongoose");

const productCategory = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true
    }
}, {timestamps: true})

const productCatalog = mongoose.Schema({
    productTitle: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    areaInfo: {type: mongoose.Types.ObjectId, ref: "Area_Info"},
    productCategory: [{
        type: mongoose.Types.ObjectId,
        ref: "Product_Category"
    }],
    farmingStartDate: {type: Date, required: true},
    farmingEndDate: {type: Date, required: true},
    unitType: {type: String, required: true},
    totalProduction: {type: String, required: true},
    totalCost: {type: String, required: true},
    moq: {type: String, required: true},
    unitCost: {type: String, required: true},
    description: {type: String, required: true},
    // createdBy: {
    //     type: mongoose.Types.ObjectId,
    //     ref: "User"
    // }
}, {timestamps: true})

const ProductCatalog = mongoose.model("Product_Catalog", productCatalog);

const ProductCategory = mongoose.model("Product_Category", productCategory);

module.exports = {ProductCatalog, ProductCategory}