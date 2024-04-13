const express = require("express");
const {
    saveCatalog,
    saveProductCategory,
    getAllCatalog,
    getAllCategories,
    getCatalogById
} = require("../controllers/catalogController");
const router = express.Router();

router.get("/catalogs", getAllCatalog)
router.get("/catalog/:id", getCatalogById)
router.get("/categories", getAllCategories)
router.post("/catalog/save/:stage", saveCatalog)
router.post("/category/save", saveProductCategory)

module.exports = router