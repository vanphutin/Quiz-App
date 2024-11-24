const express = require("express");
const router = express.Router();
const user = require("../controllers/user.controller");
const permisson = require("../middlewares/checkPermisson");

router.get("/", permisson.checkAuth, user.getUserById);
router.put("/", permisson.checkAuth, user.updateUser);

module.exports = router;
