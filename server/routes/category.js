const express = require("express");
const {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/review/category");

const router = express.Router();

const { isAuthorized, authorize } = require("../middlewares/routeProtect");
router
  .route("/")
  .get(getCategories)
  .post(isAuthorized, authorize("super_admin"), createCategory);

router
  .route("/:id")
  .put(isAuthorized, authorize("super_admin"), updateCategory)
  .delete(isAuthorized, authorize("super_admin"), deleteCategory);

module.exports = router;
