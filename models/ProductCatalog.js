const mongoose = require("mongoose");

const productSubCatalog = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
    updatedBy: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    }
}, {timestamps: true})

const productCatalog = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    subCatalog: [productSubCatalog],
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
    updatedBy: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    }
}, {timestamps: true})

const ProductCatalog = mongoose.model("Product_Catalog", productCatalog);

const ProductSubCatalog = mongoose.model("Product_Sub_Catalog", productSubCatalog);

module.exports = {ProductCatalog, ProductSubCatalog}