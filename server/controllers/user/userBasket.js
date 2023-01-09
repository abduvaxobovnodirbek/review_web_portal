const ErrorResponse = require("../../utils/errorResponse");
const asyncHandler = require("../../middlewares/async");
const UserBasket = require("../../models/UserBasket");
const Review = require("../../models/Review");

// description   Insert review to user saved basket
// route         POST /api/v1/user/saved-reviews
// access        Private
exports.createSavedReview = asyncHandler(async (req, res, next) => {
  const review = await Review.findById(req.body.reviewId);
  if (!review) {
    return next(
      new ErrorResponse(`Review not found with id of ${req.body.reviewId}`, 404)
    );
  }
  const user = await UserBasket.findOne({ user: req.user.id });

  if (!user) {
    const basket = await UserBasket.create({
      user: req.user.id,
      reviews: [req.body.reviewId],
    });
    return res.status(200).json({ success: true });
  }

  user.reviews.push(req.body.reviewId);

  await user.save();
  return res.status(200).json({ success: true });
});

// description   Get all saved reviews
// route         GET /api/v1/user/saved-reviews
// access        Private
exports.getSavedReviews = asyncHandler(async (req, res, next) => {
  const user = await UserBasket.findOne({ user: req.user.id }).populate(
    "reviews"
  );

  if (!user) {
    return res.status(200).json({ success: true, data: [] });
  }

  return res.status(200).json({ success: true, data: user.reviews });
});

// description   remove saved review
// route         GET /api/v1/user/saved-reviews/:id
// access        Private
exports.removeSavedReview = asyncHandler(async (req, res, next) => {
  const user = await UserBasket.findOne({ user: req.user.id }).populate(
    "reviews"
  );

  if (!user) {
    return next(
      new ErrorResponse(`User not found with id of ${req.params.id}`, 404)
    );
  }

  user.reviews = user.reviews.filter(
    (id) => id._id.toString() !== req.params.id
  );

  await user.save();

  return res.status(200).json({ success: true, data: user.reviews });
});
