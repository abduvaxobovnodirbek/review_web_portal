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
  passportLogin,
  passportRegister,
} = require("../controllers/user/auth");
const { isAuthorized, isActiveUser } = require("../middlewares/routeProtect");

router.post(
  "/email_login",
  passportLogin,
  isAuthorized,
  isActiveUser,
  email_login
);
router.post("/email_register", passportRegister, email_register);
router.get("/google", authGoogle);
router.get("/google/callback", authGoogleRedirect);
router.get("/facebook", authFacebook);
router.get("/facebook/callback", authFacebookRedirect);
router.post("/logout", isAuthorized, logout);

module.exports = router;
