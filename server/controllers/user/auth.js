const passport = require("passport");
const ErrorResponse = require("../../utils/errorResponse");
const asyncHandler = require("../../middlewares/async");
const User = require("../../models/User");

const successLoginUrl = "https://reportus.netlify.app";
const errorLoginUrl = "https://reportus.netlify.app";

// description    Register user
// route         POST /api/v1/auth/email_register
// access        Public
exports.email_register = asyncHandler(async (req, res, next) => {
  res.status(200).json({ success: true, user: req.user });
});

// description  Login User
// route        POST /api/v1/auth/email_login
// access       Public
exports.email_login = asyncHandler(async (req, res, next) => {
  res.status(200).json({ success: true, user: req.user });
});

exports.passportLogin = passport.authenticate("email_login", { session: true });

exports.passportRegister = passport.authenticate("email_register", {
  session: true,
});

// description    Register  or Login user with facebook
// route         GET /api/v1/auth/google
// access        Public
exports.authGoogle = passport.authenticate("google", {
  scope: ["profile", "email"],
  session: true,
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
  session: true,
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
