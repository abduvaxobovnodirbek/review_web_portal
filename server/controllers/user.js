const User = require("../models/User");
const asyncHandler = require("../middlewares/async");
const ErrorResponse = require("../utils/errorResponse");

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
