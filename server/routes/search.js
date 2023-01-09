const express = require("express");
const {
  selectedReviews,
  reviewFullTextSearch,
} = require("../controllers/search");

const router = express.Router();

router.route("/selected").get(selectedReviews);
router.route("/full-text-review").get(reviewFullTextSearch);

module.exports = router;
