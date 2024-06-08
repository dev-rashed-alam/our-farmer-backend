const User = require("../models/User");
const {ProductCatalog} = require("../models/ProductCatalog");
const CatalogService = require("../models/CatalogService");
const Order = require("../models/Order");
const {setCommonError} = require("../middlewares/common/errorHandler");

const getSummary = async (req, res, next) => {
    try {
        const farmerCount = await User.countDocuments({userType: "FARMER"});
        const catalogCount = await ProductCatalog.countDocuments();
        const catalogServiceCount = await CatalogService.countDocuments();
        const pendingOrders = await Order.find({isDelivered: "PENDING"});
        let revenue = 0;
        let totalCost = 0;
        pendingOrders.forEach(order => {
            revenue += order.totalPrice;
            order.orderItems.forEach(item => {
                totalCost += item.price
            })
        })
        let margin = revenue - totalCost
        let marginPercentage = (margin / revenue) * 100
        res.status(200).json({
            message: "Successful!",
            date: {
                farmerCount,
                catalogCount,
                catalogServiceCount,
                pendingOrderCount: pendingOrders.length,
                margin,
                marginPercentage
            }
        })
    } catch (e) {
        setCommonError(e)
    }
}

module.exports = {
    getSummary
}