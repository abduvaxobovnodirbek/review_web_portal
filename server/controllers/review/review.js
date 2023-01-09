const ErrorResponse = require("../../utils/errorResponse");
const asyncHandler = require("../../middlewares/async");
const Review = require("../../models/Review");
const User = require("../../models/User");
const { cloudinary } = require("../../utils/cloudinary");
const { default: mongoose } = require("mongoose");

// description    Get all reviews
// route          GET /api/v1/reviews
// access         Public
exports.getReviews = asyncHandler(async (req, res, next) => {
  let query;
  const reqQuery = { ...req.query };

  const removeFields = ["select", "sort", "page", "limit"];

  removeFields.forEach((param) => delete reqQuery[param]);

  let queryStr = JSON.stringify(reqQuery);

  queryStr = queryStr.replace(
    /\b(gt|gte|lt|lte|in)\b/g,
    (match) => `$${match}`
  );

  query = Review.find(JSON.parse(queryStr));

  if (req.query.select) {
    const fields = req.query.select.split(",").join(" ");
    query = query.select(fields);
  }

  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" ");
    query = query.sort(sortBy);
  } else {
    query = query.sort("-createdAt");
  }

  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await Review.countDocuments();

  query = query.skip(startIndex).limit(limit);

  const results = await query.populate("user category");

  const pagination = {};
  let nextPage = false;
  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit,
    };
    nextPage = true;
  }

  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit,
    };
  }

  res
    .status(200)
    .json({ success: true, count: total, pagination, data: results, nextPage });
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
  req.body.user = req.user.id;

  let review = await Review.findById(req.params.id);
  let images = [...req.body.imageList];
  let new_images = [];

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

  if (images.length) {
    images.map(async (image) => {
      const uploadResponse = await cloudinary.uploader.upload(image, {
        upload_preset: "dev_setups",
      });
      if (uploadResponse.public_id) {
        new_images = [...new_images, uploadResponse.public_id.slice(11)];
        if (new_images.length === req.body.imageList.length) {
          const review = await Review.findOneAndUpdate(
            req.params.id,
            { ...req.body, imageList: new_images },
            {
              new: true,
              runValidators: true,
            }
          );
          res.status(201).json({
            success: true,
            data: review,
          });
        }
      }
    });
  } else {
    const review = await Review.findOneAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ success: true, data: review });
  }
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

// description   Get all reviews that belong to single user
// route         GET /api/v1/reviews/check/:id
// access        Public
exports.getUserAllReviews = asyncHandler(async (req, res, next) => {
  const reviews = await Review.find({ user: req.params.id })
    .populate("user category")
    .sort("-createdAt");
  const user = await User.findById(req.params.id);
  console.log(reviews, user);
  if (!reviews) {
    return next(new ErrorResponse(`Reviews not found`, 404));
  }

  res.status(200).json({ success: true, data: { reviews, user } });
});

// description   like functionality for each reviews
// route         GET /api/v1/reviews/like/:id
// access        Private
exports.likeReview = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const review = await Review.findById(id);

  if (!review) {
    return next(new ErrorResponse(`Review not found`, 404));
  }

  const index = review.likes.findIndex((id) => id === req.user.id);

  if (index === -1) {
    review.likes.push(req.user.id);
    review.likeCount = review.likeCount + 1;
  } else {
    review.likes = review.likes.filter((id) => id !== req.user.id);
    review.likeCount = review.likeCount - 1;
  }

  const updatedReview = await Review.findByIdAndUpdate(id, review, {
    new: true,
  });
  res.status(201).json({ success: true, data: updatedReview });
});

// description   calculate review rate
// route         PATCH /api/v1/reviews/rate/:id
// access        Private
exports.rateReview = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const review = await Review.findById(id);

  if (!review) {
    return next(new ErrorResponse(`Review not found`, 404));
  }

  const index = review.rating.findIndex(
    (user) => user.user?.toString() === req.user.id
  );

  if (index === -1) {
    review.rating.push({
      user: req.user.id,
      userGrade: req.body.userGrade,
    });
  } else {
    review.rating[index] = {
      ...review.rating[index],
      userGrade: req.body.userGrade,
      user: req.user.id,
    };
  }

  const sum = review.rating.reduce((a, b) => a + b?.userGrade, 0);
  const avg = sum / review.rating.length || 0;

  review.averageRate = avg;

  const updatedReview = await review.save();
  res.status(201).json({ success: true, data: updatedReview });
});

// description   Get all reviews that user follows
// route         GET /api/v1/reviews/following
// access        Private
exports.getFollowingReviews = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    return next(new ErrorResponse(`User not found`, 404));
  }

  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await Review.countDocuments();

  const pagination = {};
  let nextPage = false;
  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit,
    };
    nextPage = true;
  }

  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit,
    };
  }

  const reviews = await Review.find({ user: { $in: user.following } })
    .skip(startIndex)
    .limit(limit)
    .populate("user category")
    .sort("-createdAt");

  res
    .status(200)
    .json({ success: true, count: total, pagination, data: reviews, nextPage });
});

// description   Get all trend reviews
// route         GET /api/v1/reviews/trend/
// access        Public
exports.getTrendReviews = asyncHandler(async (req, res, next) => {
  const reviews = await Review.find()
    .populate("user category")
    .sort({ likeCount: -1, createdAt: -1 })
    .limit(3);
  if (!reviews) {
    return next(new ErrorResponse(`Reviews not found`, 404));
  }

  res.status(200).json({ success: true, data: reviews });
});

// description   Get most relevant category  reviews
// route         GET /api/v1/reviews/:reviewId/suggested/category=..?
// access        Public
exports.getSuggestedReviews = asyncHandler(async (req, res, next) => {
  let reviews = await Review.find({
    category: mongoose.Types.ObjectId(req.query.category),
  })
    .populate("user category")
    .sort({ likeCount: -1, createdAt: -1 })
    .limit(4);

  if (!reviews) {
    return next(new ErrorResponse(`Reviews not found`, 404));
  }

  console.log(req.params.reviewId);

  reviews = reviews.filter(
    (review) => review.id.toString() !== req.params.reviewId
  );
  console.log(reviews);

  res.status(200).json({ success: true, data: reviews });
});
