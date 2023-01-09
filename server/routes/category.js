const express = require("express");
const {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/review/category");

const router = express.Router();

const {
  isAuthorized,
  isActiveUser,
  authorize,
} = require("../middlewares/routeProtect");
//isAuthorized, isActiveUser, authorize("super_admin"),
router
  .route("/")
  .get(getCategories)
  .post( createCategory);

router
  .route("/:id")
  .put( updateCategory)
  .delete( deleteCategory);

module.exports = router;
