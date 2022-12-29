const passport = require("passport");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middlewares/async");
const User = require("../models/User");

const successLoginUrl = "http://localhost:3000/login/success";
const errorLoginUrl = "http://localhost:3000/login/error";

// description    Register user
// route         POST /api/v1/auth/email_register
// access        Public
exports.email_register = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;

  const existedUser = await User.findOne({ email });
  if (existedUser) {
    return next(
      new ErrorResponse(`The user with '${email}' already exists`, 400)
    );
  }

  const user = await User.create({ name, email, password });

  const accessToken = user.GenerateJWT();
  res.status(200).json({ success: true, accessToken });
});

// description  Login User
// route        POST /api/v1/auth/email_login
// access       Public
exports.email_login = asyncHandler(async (req, res, next) => {
  const { email, password, authType, token } = req.body;
  if (!email || !password) {
    return next(new ErrorResponse(`Please provide credentials`, 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(
      new ErrorResponse(`The user with '${email}' not  registered`, 400)
    );
  }

  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    return next(new ErrorResponse(`Invalid credentials entered`, 400));
  }

  if (user && !user.status) {
    return next(new ErrorResponse(`User account is blocked`, 400));
  }

  const accessToken = user.GenerateJWT();
  res.status(200).json({ success: true, accessToken });
});

// description    Register  or Login user with facebook
// route         GET /api/v1/auth/google
// access        Public
exports.authGoogle = passport.authenticate("google", {
  scope: ["profile", "email"],
});

// description    After google successfully integrate it redirects to this api
// route         GET /api/v1/auth/google/callback
// access        Public
exports.authGoogleRedirect = passport.authenticate("google", {
  failureMessage: "Cannot login to Google!",
  failureRedirect: errorLoginUrl,
  successRedirect: successLoginUrl,
});


// description    Register  or Login user with facebook
// route         GET /api/v1/auth/facebook
// access        Public
exports.authFacebook = passport.authenticate("facebook", {
  scope: ["profile", "email"],
});

// description    After facebook successfully integrate it redirects to this api
// route         GET /api/v1/auth/facebook/callback
// access        Public
exports.authFacebookRedirect = passport.authenticate("facebook", {
  failureMessage: "Cannot login to Google!",
  failureRedirect: errorLoginUrl,
  successRedirect: successLoginUrl,
});




// description    user log out
// route         GET /api/v1/auth/logout
// access        Private
exports.logout = asyncHandler(async (req, res, next) => {
  req.logOut();
  req.session.destroy();
  return res.status(200).json({
    success: true,
    message: "logged out successfully",
  });
});
