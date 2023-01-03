const express = require("express");
const router = express.Router();
const {
  getMe,
  getAllUsers,
  updateUser,
  deleteUser,
} = require("../controllers/user");
const {
  isAuthorized,
  authorize,
  isActiveUser,
} = require("../middlewares/routeProtect");

router.get("/me", isAuthorized, getMe);
router.get(
  "/all",
  isAuthorized,
  authorize("admin", "super_admin"),
  getAllUsers
);
router
  .route("/:id")
  .put(isAuthorized, isActiveUser, updateUser)
  .delete(
    isAuthorized,
    isActiveUser,
    authorize("admin", "super_admin"),
    deleteUser
  );

module.exports = router;
