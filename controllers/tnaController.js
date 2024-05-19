const {setCommonError} = require("../middlewares/common/errorHandler");
const {ProductPhase, PhaseActivity} = require("../models/ProductTNA");
const {parseDate} = require("../utilities/helper");


const saveTnaMasterData = async (req, res, next) => {
    try {
        const newPhase = new ProductPhase({
            title: req.body.title,
            createdBy: req.loggedInUser.id
        })
        await newPhase.save();

        const activityPromises = req.body.activityList?.map(async (item) => {
            const activity = new PhaseActivity({
                name: item,
                phase: newPhase.id,
                createdBy: req.loggedInUser.id
            })
            await activity.save()
        })
        await Promise.all(activityPromises);
        res.status(200).json({
            message: "Save successful!"
        })
    } catch (error) {
        console.log(error)
        setCommonError(error)
    }
}

module.exports = {saveTnaMasterData}