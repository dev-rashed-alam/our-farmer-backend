const express = require("express");
const {
    saveCatalog,
    saveProductCategory,
    getAllCatalog,
    getAllCategories,
    getCatalogById,
    updateCatalog,
    changeProductStatus,
    removeCatalog,
    getAllCatalogByUser
} = require("../controllers/catalogController");
const authMiddleware = require("../middlewares/common/authMiddleware");
const {
    getAllCatalogService,
    getAllCatalogServiceByUser,
    getCatalogServiceById,
    saveCatalogService,
    updateCatalogService,
    changeCatalogServiceStatus,
    removeCatalogService, getCatalogServiceByStatus
} = require("../controllers/catalogServiceController");
const {getProductTnaById, getProductTnaByUser, updateProductTna} = require("../controllers/tnaController");
const router = express.Router();

router.get("/tna/by-user", authMiddleware, getProductTnaByUser)
router.get("/tna/:id", authMiddleware, getProductTnaById)
router.put("/tna/:id", authMiddleware, updateProductTna)

router.get("/catalogs", authMiddleware, getAllCatalog)
router.get("/catalogs/by-user", authMiddleware, getAllCatalogByUser)
router.get("/catalog/:id", authMiddleware, getCatalogById)
router.get("/categories", getAllCategories)
router.post("/catalog/save/:stage", authMiddleware, saveCatalog)
router.post("/category/save", authMiddleware, saveProductCategory)
router.put("/catalog/update/:stage/:id", authMiddleware, updateCatalog)
router.put("/catalog/change/status/:status/:id", authMiddleware, changeProductStatus)
router.delete("/remove/catalog/:id", authMiddleware, removeCatalog)

router.get("/services", authMiddleware, getAllCatalogService)
router.get("/services/by-user", authMiddleware, getAllCatalogServiceByUser)
router.get("/service/:id", authMiddleware, getCatalogServiceById)
router.get("/services/:status", authMiddleware, getCatalogServiceByStatus)
router.post("/service/save", authMiddleware, saveCatalogService)
router.put("/service/update/:id", authMiddleware, updateCatalogService)
router.put("/service/change/status/:id/:status", authMiddleware, changeCatalogServiceStatus)
router.delete("/service/remove/:id", authMiddleware, removeCatalogService)

module.exports = router