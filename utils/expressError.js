const express = require("express");
const router = express.Router();
const User = require("../models/user");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveUrl } = require("../middleware");
const userController = require("../controllers/users");

//======================>SIGN-UP<======================//

router
  .route("/signup")
  .get(userController.renderSignUpForm)
  .post(wrapAsync(userController.signUpUser));

//======================>LOGIN<======================//

router
  .route("/login")
  .get(userController.renderLoginForm)
  .post(
    saveUrl,
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
    }),
    userController.loginUser
  );

 

//======================>LOGOUT<======================//
router.get("/logout", userController.logoutUser);

module.exports = router;