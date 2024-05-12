const express = require("express");
const {
    saveCatalog,
    saveProductCategory,
    getAllCatalog,
    getAllCategories,
    getCatalogById, updateCatalog, changeProductStatus, removeCatalog
} = require("../controllers/catalogController");
const router = express.Router();

router.get("/catalogs", getAllCatalog)
router.get("/catalog/:id", getCatalogById)
router.get("/categories", getAllCategories)
router.post("/catalog/save/:stage", saveCatalog)
router.put("/catalog/update/:stage/:id", updateCatalog)
router.put("/catalog/change/status/:status/:id", changeProductStatus)
router.delete("/remove/catalog/:id", removeCatalog)
router.post("/category/save", saveProductCategory)


module.exports = router