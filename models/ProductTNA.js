const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema({
    name: {type: String, required: true},
    phase: {type: mongoose.Types.ObjectId, ref: "Product_Phase"},
    createdBy: {type: mongoose.Types.ObjectId, ref: "User"}
}, {timestamps: true});

const phaseSchema = new mongoose.Schema({
    title: {type: String, required: true},
    createdBy: {type: mongoose.Types.ObjectId, ref: "User"}
}, {timestamps: true});


const productTna = mongoose.Schema({
    serviceInfo: {type: mongoose.Types.ObjectId, ref: "Catalog_Service"},
    createdBy: {type: mongoose.Types.ObjectId, ref: "User"},
    requestedUser: {type: mongoose.Types.ObjectId, ref: "User"},
    activity: [{type: mongoose.Types.ObjectId, ref: "Phase_Activity"}],
    actions: [{
        activityId: {type: mongoose.Types.ObjectId, required: true},
        startDate: {type: Date},
        endDate: {type: Date},
        remarks: {type: String},
    }]
}, {timestamps: true})

const ProductPhase = mongoose.model("Product_Phase", phaseSchema);
const PhaseActivity = mongoose.model("Phase_Activity", activitySchema);
const ProductTna = mongoose.model("Product_Tna", productTna);

module.exports = {ProductTna, ProductPhase, PhaseActivity}