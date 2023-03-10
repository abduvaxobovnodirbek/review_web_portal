const express = require("express");
const router = express.Router();
const {
  getMe,
  getAllUsers,
  updateUser,
  deleteUser,
  followToUser,
  statusChange,
} = require("../controllers/user/user");
const {
  getSavedReviews,
  createSavedReview,
  removeSavedReview,
} = require("../controllers/user/userBasket");
const {
  isAuthorized,
  authorize,
  isActiveUser,
} = require("../middlewares/routeProtect");

router.get("/me", isAuthorized, isActiveUser, getMe);
router.put("/follow", isAuthorized, isActiveUser, followToUser);

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

router.patch(
  "/status/:id",
  isAuthorized,
  authorize("super_admin"),
  statusChange
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
