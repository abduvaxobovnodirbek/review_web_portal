const express = require("express");
const {
  getReview,
  getReviews,
  createReview,
  deleteReview,
  updateReview,
  getTags,
  getPersonalReviews,
} = require("../controllers/review");

const router = express.Router();

const { isAuthorized, isActiveUser } = require("../middlewares/routeProtect");

router
  .route("/")
  .get(getReviews)
  .post(isAuthorized, isActiveUser, createReview);

router.route("/tags").get(getTags);
router.route("/personal").get(isAuthorized, getPersonalReviews);

router
  .route("/:id")
  .get(getReview)
  .put(isAuthorized, isActiveUser, updateReview)
  .delete(isAuthorized, isActiveUser, deleteReview);

module.exports = router;
