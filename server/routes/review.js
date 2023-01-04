const express = require("express");
const {
  getReview,
  getReviews,
  createReview,
  deleteReview,
  updateReview,
  getTags,
  getPersonalReviews,
  getUserAllReviews,
  likeReview,
} = require("../controllers/review");

const router = express.Router();

const { isAuthorized, isActiveUser } = require("../middlewares/routeProtect");

router
  .route("/")
  .get(getReviews)
  .post(isAuthorized, isActiveUser, createReview);

router.patch("/like/:id", isAuthorized, isActiveUser, likeReview);
router.get("/user/:id", getUserAllReviews);
router.get("/tags", getTags);
router.get("/personal", isAuthorized, getPersonalReviews);

router
  .route("/:id")
  .get(getReview)
  .put(isAuthorized, isActiveUser, updateReview)
  .delete(isAuthorized, isActiveUser, deleteReview);

module.exports = router;
