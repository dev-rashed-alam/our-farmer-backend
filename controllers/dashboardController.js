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
            data: {
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

const getOrderSummary = async (req, res, next) => {
    try {
        const report = await Order.aggregate([
            {
                $group: {
                    _id: {
                        year: {$year: '$createdAt'},
                        month: {$month: '$createdAt'},
                        status: '$isDelivered'
                    },
                    count: {$sum: 1}
                }
            },
            {
                $group: {
                    _id: {
                        year: '$_id.year',
                        month: '$_id.month'
                    },
                    statuses: {
                        $push: {
                            status: '$_id.status',
                            count: '$count'
                        }
                    }
                }
            },
            {
                $project: {
                    year: '$_id.year',
                    month: '$_id.month',
                    statuses: {
                        $arrayToObject: {
                            $map: {
                                input: '$statuses',
                                as: 'statusCount',
                                in: {k: '$$statusCount.status', v: '$$statusCount.count'}
                            }
                        }
                    }
                }
            },
            {
                $sort: {'year': 1, 'month': 1}
            }
        ]);
        res.status(200).json({
            message: "Successful!",
            data: report
        })
    } catch (e) {
        console.log(e)
        setCommonError(e)
    }
}

module.exports = {
    getSummary,
    getOrderSummary
}