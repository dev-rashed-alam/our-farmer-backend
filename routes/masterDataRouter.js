const express = require("express");
const {getAllCountryMasterData, addCountryMasterData} = require("../controllers/masterDataController");
const router = express.Router();

router.get("/country", getAllCountryMasterData);
router.post("/country", addCountryMasterData);

module.exports = router;