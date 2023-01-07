const express = require("express");
const router = express.Router();
const {
  getMe,
  getAllUsers,
  updateUser,
  deleteUser,
  followToUser,
} = require("../controllers/user");
const {
  getSavedReviews,
  createSavedReview,
  removeSavedReview,
} = require("../controllers/userBasket");
const {
  isAuthorized,
  authorize,
  isActiveUser,
} = require("../middlewares/routeProtect");

router.get("/me", isAuthorized, getMe);
router.put("/follow", isAuthorized, followToUser);

router.get(
  "/all",
  isAuthorized,
  authorize("admin", "super_admin"),
  getAllUsers
);

router
  .route("/saved-reviews")
  .get(isAuthorized, getSavedReviews)
  .post(isAuthorized, isActiveUser, createSavedReview);

router.patch(
  "/saved-reviews/:id",
  isAuthorized,
  isActiveUser,
  removeSavedReview
);

router
  .route("/:id")
  .put(isAuthorized, isActiveUser, updateUser)
  .delete(
    isAuthorized,
    isActiveUser,
    authorize("admin", "super_admin"),
    deleteUser
  );

module.exports = router;
