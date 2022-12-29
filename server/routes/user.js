const express = require("express");
const router = express.Router();
const { getMe } = require("../controllers/user");
const { isAuthorized } = require("../middlewares/routeProtect");

router.get("/me",isAuthorized, getMe);

module.exports = router;
