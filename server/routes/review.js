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
  getFollowingReviews,
  rateReview,
  getTrendReviews,
  commentOnReview,
  getSuggestedReviews,
} = require("../controllers/review/review");

const router = express.Router();

const { isAuthorized, isActiveUser } = require("../middlewares/routeProtect");

router
  .route("/")
  .get(getReviews)
  .post(isAuthorized, isActiveUser, createReview);

router.patch("/like/:id", isAuthorized, isActiveUser, likeReview);
router.get("/following", isAuthorized, getFollowingReviews);
router.get("/personal", isAuthorized, getPersonalReviews);
router.get("/user/:id", getUserAllReviews);
router.patch("/rate/:id", isAuthorized, rateReview);
router.get("/tags", getTags);
router.get("/trend", getTrendReviews);
router.get("/:reviewId/suggested", getSuggestedReviews);

router
  .route("/:id")
  .get(getReview)
  .put(isAuthorized, isActiveUser, updateReview)
  .delete(isAuthorized, isActiveUser, deleteReview);

module.exports = router;
