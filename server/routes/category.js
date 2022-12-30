const express = require("express");
const {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/category");

const router = express.Router();

const {
  isAuthorized,
  isActiveUser,
  authorize,
} = require("../middlewares/routeProtect");

router
  .route("/")
  .get(getCategories)
  .post(isAuthorized, isActiveUser, authorize("super_admin"), createCategory);

router
  .route("/:id")
  .put(isAuthorized, isActiveUser, authorize("super_admin"), updateCategory)
  .delete(isAuthorized, isActiveUser, authorize("super_admin"), deleteCategory);

module.exports = router;
