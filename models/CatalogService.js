const mongoose = require("mongoose");

const catalogService = mongoose.Schema({
    serviceType: {type: Object, required: true},
    productCatalog: {type: mongoose.Types.ObjectId, ref: "Product_Catalog"},
    createdBy: {type: mongoose.Types.ObjectId, ref: "User"},
    productionStartDate: {type: Date, required: true},
    productionEndDate: {type: Date, required: true},
    tenureType: {type: Object, required: true},
    sellingPrice: {type: String, required: true},
    description: {type: String},
    status: {
        type: String,
        enum: ["PENDING", "APPROVED", "HOLD", "REJECTED"],
        default: "PENDING"
    }
}, {timestamps: true})

const CatalogService = mongoose.model("Catalog_Service", catalogService);

module.exports = CatalogService