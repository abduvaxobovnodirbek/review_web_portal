const express = require("express");
const router = express.Router();
const {
  email_login,
  email_register,
  authGoogle,
  authGoogleRedirect,
  logout,
  authFacebook,
  authFacebookRedirect,
} = require("../controllers/auth");
const { isAuthorized } = require("../middlewares/routeProtect");

router.post("/email_login", email_login);
router.post("/email_register", email_register);
router.get("/google", authGoogle);
router.get("/google/callback", authGoogleRedirect);
router.get("/facebook", authFacebook);
router.get("/facebook/callback", authFacebookRedirect);
router.get("/logout", isAuthorized, logout);

module.exports = router;
