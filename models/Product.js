const mongoose = require("mongoose")

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    nameBn: {
        type: String,
        required: false,
        trim: true
    },
    slug: {
        type: String,
        trim: true,
        unique: true
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    descriptionBn: {
        type: String,
        required: false,
        trim: true,
    },
    stock: {
        type: Number,
        required: true,
        default: 0
    },
    price: {
        type: Number,
        required: true
    },
    discountType: {
        type: String,
        enum: ["PERCENTAGE", "FIXED"],
        default: "PERCENTAGE"
    },
    discount: {
        type: Number,
        default: 0
    },
    image: {
        type: String
    },
    status: {
        type: Boolean,
        default: 0
    },
    isFeatured: {
        type: Boolean,
        default: false
    },
    isTrending: {
        type: Boolean,
        default: false
    },
    sku: {
        type: String,
        required: false,
        default: ""
    },
    category: {
        type: mongoose.Types.ObjectId,
        ref: "Product_Category"
    },
}, {timestamps: true});

const Product = mongoose.model("Product", productSchema)

module.exports = Product