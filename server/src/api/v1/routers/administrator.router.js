const express = require("express");
const router = express.Router();
const administratorController = require("../controllers/administrator.controller");
const permisson = require("../middlewares/checkPermisson");

router.get(
  "/users",
  permisson.checkPermission,
  administratorController.getUsers
);
router.get(
  "/quizzes",
  permisson.checkPermission,
  administratorController.getQuizzes
);
router.get(
  "/questions/total",
  permisson.checkPermission,
  administratorController.countQuestion
);
router.get(
  "/categories/total",
  permisson.checkPermission,
  administratorController.countCategories
);
router.get(
  "/categories",
  permisson.checkPermission,
  administratorController.getCategories
);

module.exports = router;
