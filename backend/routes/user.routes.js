const {
  register,
  login,
  getMyProfile,
  logout,
} = require("../controllers/user.controller");

const router = require("express").Router();
router.route("/register").post(register);
router.route("/login").post(login);
router.route("/me").get(getMyProfile);
router.route("/logout").get(logout);
module.exports = router;
