const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middlewares/async");
const Review = require("../models/Review");
const { cloudinary } = require("../utils/cloudinary");
const User = require("../models/User");

// description    Get all reviews
// route          GET /api/v1/reviews
// access         Public
exports.getReviews = asyncHandler(async (req, res, next) => {
  let query;

  // Copy req.query
  const reqQuery = { ...req.query };

  // Fields to exclude
  const removeFields = ["select", "sort", "page", "limit"];

  // Loop over removeFields and delete them from reqQuery
  removeFields.forEach((param) => delete reqQuery[param]);

  // Create query string
  let queryStr = JSON.stringify(reqQuery);

  // Create operators ($gt, $gte, etc)
  queryStr = queryStr.replace(
    /\b(gt|gte|lt|lte|in)\b/g,
    (match) => `$${match}`
  );

  // Finding resource
  query = Review.find(JSON.parse(queryStr));

  // Select Fields
  if (req.query.select) {
    const fields = req.query.select.split(",").join(" ");
    query = query.select(fields);
  }

  // Sort
  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" ");
    query = query.sort(sortBy);
  } else {
    query = query.sort("-createdAt");
  }

  // Pagination
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await Review.countDocuments();

  query = query.skip(startIndex).limit(limit);

  // Executing query
  const results = await query.populate("user category");

  // Pagination result
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
    .json({ success: true, count: total, pagination, data: results });
});

// description   Get single review
// route         GET /api/v1/reviews/:id
// access        Public
exports.getReview = asyncHandler(async (req, res, next) => {
  const review = await Review.findById(req.params.id).populate("user category");

  if (!review) {
    return next(
      new ErrorResponse(`Review not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({ success: true, data: review });
});

// description   Get all reviews that belong to single user
// route         GET /api/v1/reviews/personal
// access        Private
exports.getPersonalReviews = asyncHandler(async (req, res, next) => {
  const reviews = await Review.find({ user: req.user })
    .populate("user category")
    .sort("-createdAt");

  if (!reviews) {
    return next(new ErrorResponse(`Reviews not found`, 404));
  }

  res.status(200).json({ success: true, data: reviews });
});

// description   Create new review
// route         POST /api/v1/reviews
// access        Private

exports.createReview = asyncHandler(async (req, res, next) => {
  req.body.user = req.user.id;

  let publicIds = [];

  if (req.body.imageList.length) {
    req.body.imageList.map(async (image, index) => {
      const uploadResponse = await cloudinary.uploader.upload(image, {
        upload_preset: "dev_setups",
      });
      if (uploadResponse.public_id) {
        publicIds = [...publicIds, uploadResponse.public_id.slice(11)];
        if (publicIds.length === req.body.imageList.length) {
          const review = await Review.create({
            ...req.body,
            imageList: publicIds,
          });
          res.status(201).json({
            success: true,
            data: review,
          });
        }
      }
    });
  } else {
    const review = await Review.create({
      ...req.body,
    });

    res.status(201).json({
      success: true,
      data: review,
    });
  }
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

// description   Get all tags
// route         GET /api/v1/reviews/tags
// access        Public
exports.getTags = asyncHandler(async (req, res, next) => {
  const reviews = await Review.find();
  let tags = [];
  if (reviews.length) {
    reviews.map((review) => {
      review.tags.map((tag) => {
        if (!tags.includes(tag)) {
          tags.push(tag);
        }
      });
    });
  }

  console.log(tags);

  res.status(200).json({ success: true, tags });
});
