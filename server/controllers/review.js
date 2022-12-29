const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middlewares/async");
const Review = require("../models/Review");

// description    Get all reviews
// route          GET /api/v1/reviews
// access         Public
exports.getReviews = asyncHandler(async (req, res, next) => {
  const reqQuery = { ...req.query };
  const removeFields = ["page", "limit"];

  removeFields.forEach((param) => delete reqQuery[param]);

  const reviews = await Review.find(reqQuery);

  if (req.query.select) {
    const fields = req.query.select.split(",").join(" ");
    reviews = reviews.select(fields);
  }

  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 25;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await Review.countDocuments();

  reviews = reviews.skip(startIndex).limit(limit);

  const results = await reviews;

  const pagination = {};

  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit,
    };
  }

  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit,
    };
  }

  res
    .status(200)
    .json({ success: true, count: results.length, pagination, data: results });
});

// description   Get single review
// route         GET /api/v1/review/:id
// access        Public
exports.getReview = asyncHandler(async (req, res, next) => {
  const review = await Review.findById(req.params.id);

  if (!review) {
    return next(
      new ErrorResponse(`Review not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({ success: true, data: review });
});

// description   Create new review
// route         POST /api/v1/reviews
// access        Private
exports.createReview = asyncHandler(async (req, res, next) => {
  req.body.user = req.user.id;

  const review = await Review.create(req.body);

  res.status(201).json({
    success: true,
    data: review,
  });
});

// description   Update Review
// route         PUT /api/v1/reviews/:id
// access        Private
exports.updateReview = asyncHandler(async (req, res, next) => {
  let review = await Review.findById(req.params.id);

  if (!review) {
    return next(
      new ErrorResponse(`review not found with id of ${req.params.id}`, 404)
    );
  }

  if (
    review.user.toString() !== req.user.id &&
    req.user.role !== "admin" &&
    req.user.role !== "super_admin"
  ) {
    return next(
      new ErrorResponse(
        `User ${req.params.id} do not have permission to update this review`,
        401
      )
    );
  }

  review = await Review.findOneAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({ success: true, data: review });
});

// description    Delete Review
// route          DELETE /api/v1/reviews/:id
// access         Private
exports.deleteReview = asyncHandler(async (req, res, next) => {
  const review = await Review.findById(req.params.id);

  if (!review) {
    return next(
      new ErrorResponse(`Review not found with id of ${req.params.id}`, 404)
    );
  }

  if (
    review.user.toString() !== req.user.id &&
    req.user.role !== "admin" &&
    req.user.role !== "super_admin"
  ) {
    return next(
      new ErrorResponse(
        `User ${req.params.id} do not have permission to delete this review`,
        401
      )
    );
  }

  review.remove();

  res.status(200).json({ success: true, data: {} });
});
