const express = require("express");
const {findAllUsers, removeUserById} = require("../controllers/userController");
const router = express.Router();

router.get("/users", findAllUsers)
router.get("/delete/user", removeUserById)

module.exports = router;