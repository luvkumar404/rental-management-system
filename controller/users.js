const User = require("../models/user");

module.exports.renderSignUpForm = (req, res) => {
  return res.render("users/signup.ejs");
};

module.exports.signUpUser = async (req, res) => {
  try {
    let { username, email, password } = req.body;
     
    let newUser = new User({ username, email });

    let registeredUser = await User.register(newUser, password);
    req.login(registeredUser, (err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", "Welcome to Wanderlust!");
     return res.redirect("/listings");
    });

    // console.log(registeredUser);
  } catch (er) {
    req.flash("error", er.message);
   return res.redirect("/signup");
  }
};

module.exports.renderLoginForm = (req, res) => {
  return res.render("users/login.ejs");
};

module.exports.loginUser = async (req, res) => {
  req.flash("success", "Welcome to wanderlust!");
  let redirecturl = res.locals.redirectUrl || "/listings";
 return res.redirect(redirecturl);
};

module.exports.logoutUser = (req, res, next) => {
  req.logOut((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "You are logged out!");
    return res.redirect("/listings");
  });
};