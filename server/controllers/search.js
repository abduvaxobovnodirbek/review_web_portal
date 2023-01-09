const { default: mongoose } = require("mongoose");
const asyncHandler = require("../middlewares/async");
const Review = require("../models/Review");
const User = require("../models/User");
const ErrorResponse = require("../utils/errorResponse");

// description   Get most relevant category or tagged  reviews
// route         GET /api/v1/search/selected?category=..&tags=..
// access        Public
exports.selectedReviews = asyncHandler(async (req, res, next) => {
  const { category, tags } = req.query;
  if (tags) {
    const reviews = await Review.find({ tags: { $in: [tags] } })
      .populate("user category")
      .sort({ likeCount: -1, createdAt: -1 });
    if (!reviews) {
      return next(new ErrorResponse(`Reviews not found`, 404));
    }

    res.status(200).json({ success: true, data: reviews });
  } else if (category) {
    let reviews = await Review.find()
      .populate("user category")
      .sort({ likeCount: -1, createdAt: -1 })
      .limit(4);

    reviews = reviews.filter((review) => review.category.name === category);

    if (!reviews) {
      return next(new ErrorResponse(`Reviews not found`, 404));
    }

    res.status(200).json({ success: true, data: reviews });
  }
});

// description   Get  full text search
// route         GET /api/v1/search/full-text-review?q=...
// access        Public
exports.reviewFullTextSearch = asyncHandler(async (req, res, next) => {
  const reviews = await Review.find(
    { $text: { $search: req.query.q } },
    { likeCount: { $meta: "textScore" } }
  )
    .sort({ likeCount: { $meta: "textScore" } })
    .populate("user category");
  if (!reviews) {
    return next(new ErrorResponse(`Reviews not found`, 404));
  }

  res.status(200).json({ success: true, data: reviews });
});
