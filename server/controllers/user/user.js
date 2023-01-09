const User = require("../../models/User");
const asyncHandler = require("../../middlewares/async");
const ErrorResponse = require("../../utils/errorResponse");
const { cloudinary } = require("../../utils/cloudinary");

// description    Get me (authenticated user)
// route         GET /api/v1/user/me
// access        Private
exports.getMe = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    data: user,
  });
});

// description    Get all users
// route         GET /api/v1/user/all
// access        Private only Admin can have access it
exports.getAllUsers = asyncHandler(async (req, res, next) => {
  const user = await User.find();

  res.status(200).json({
    success: true,
    data: user,
  });
});

// description      Update user
// route     PUT /api/v1/user/:id
// access    Private
exports.updateUser = asyncHandler(async (req, res, next) => {
  let user = await User.findById(req.params.id);
  if (!user) {
    return next(
      new ErrorResponse(`user not found with id of ${req.params.id}`, 404)
    );
  }

  if (
    user.id.toString() !== req.user.id &&
    req.user.role !== "admin" &&
    req.user.role !== "super_admin"
  ) {
    return next(
      new ErrorResponse(
        `User ${req.params.id} do not have permission to update this user`,
        401
      )
    );
  }

  if (req.body.image) {
    const cloudinaryUpload = await cloudinary.uploader.upload(req.body.image, {
      upload_preset: "dev_setups",
    });
    await cloudinary.uploader.destroy(
      "dev_setups/" + req.body.public_id,
      function (err, result) {}
    );
    req.body.image = cloudinaryUpload.public_id.slice(11);
  }

  user = await User.findOneAndUpdate({ email: req.user.email }, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({ success: true, data: user });
});

// description      Delete user
// route     DELETE /api/v1/user/:id
// access    Private  only Admin can delete users
exports.deleteUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorResponse(`User not found with id of ${req.params.id}`, 404)
    );
  }

  if (
    user.id.toString() !== req.user.id &&
    req.user.role !== "admin" &&
    req.user.role !== "super_admin"
  ) {
    return next(
      new ErrorResponse(
        `User ${req.params.id} do not have permission to delete this user`,
        401
      )
    );
  }

  user.remove();

  res.status(200).json({ success: true, data: {} });
});

// description   Follow to another review publisher
// route         PUT /api/v1/user/follow
// access        Private
exports.followToUser = asyncHandler(async (req, res, next) => {
  let followTo = await User.findById(req.body.followTo);
  if (!followTo) {
    return next(
      new ErrorResponse(`user not found with id of ${req.body.followTo}`, 404)
    );
  }

  let user = await User.findById(req.body.user);

  if (user.id.toString() !== req.user.id) {
    return next(
      new ErrorResponse(
        `User ${user.id} do not have permission to follow ${req.body.followTo}`,
        401
      )
    );
  }

  if (user.following.includes(req.body.followTo)) {
    user.following = user.following.filter(
      (id) => id.toString() !== req.body.followTo
    );
  } else {
    user.following = [...user.following, req.body.followTo];
  }
  const updated_user = await user.save();

  if (followTo.followers.includes(req.body.user)) {
    followTo.followers = followTo.followers.filter(
      (id) => id.toString() !== req.body.user
    );
  } else {
    followTo.followers = [...followTo.followers, req.body.user];
  }

  await followTo.save();

  res.status(200).json({ success: true, data: updated_user });
});
