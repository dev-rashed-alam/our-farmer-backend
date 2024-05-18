const express = require("express");
const {
    saveCatalog,
    saveProductCategory,
    getAllCatalog,
    getAllCategories,
    getCatalogById, updateCatalog, changeProductStatus, removeCatalog, getAllCatalogByUser
} = require("../controllers/catalogController");
const authMiddleware = require("../middlewares/common/authMiddleware");
const router = express.Router();

router.get("/catalogs", authMiddleware, getAllCatalog)
router.get("/catalogs/by-user", authMiddleware, getAllCatalogByUser)
router.get("/catalog/:id", authMiddleware, getCatalogById)
router.get("/categories", authMiddleware, getAllCategories)
router.post("/catalog/save/:stage", authMiddleware, saveCatalog)
router.put("/catalog/update/:stage/:id", authMiddleware, updateCatalog)
router.put("/catalog/change/status/:status/:id", authMiddleware, changeProductStatus)
router.delete("/remove/catalog/:id", authMiddleware, removeCatalog)
router.post("/category/save", authMiddleware, saveProductCategory)


module.exports = router