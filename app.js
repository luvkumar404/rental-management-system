if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const expressError = require("./utils/expressError");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
let User = require("./models/user.js");

const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/reviews.js");
const userRouter = require("./routes/users.js");
const MongoStore = require("connect-mongo");

app.engine("ejs", ejsMate);
app.use(methodOverride("_method"));

app.use(express.urlencoded({ extended: true }));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "/public")));

let dbUrl = process.env.ATLASDB_URL;

main()
  .then(() => {
    console.log("Connection Successful");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1); // Optional: stop the app if DB connection fails
  });

async function main() {
  await mongoose.connect(dbUrl);
}

app.listen(8080, () => {
  console.log("App is listening from 8080");
});

// app.get("/", (req, res) => {
//   res.send("Working...");
// });

const store = MongoStore.create({
  mongoUrl: dbUrl,
  crypto: {
    secret: process.env.SECRET,
  },
  touchAfter: 24 * 3600,
});

store.on("error", (err) => {
  console.log("ERROR IN MONGO SESSION STORE", err);
});

const sessionOptions = {
  store,
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};

app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
  next();
});

app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewRouter);
app.use("/", userRouter);

app.get("/demouser", async (req, res) => {
  let fakeUser = {
    email: "abc@gmail.com",
    username: "abc_user",
  };

  let registeredUser = await User.register(fakeUser, "helloWorld");
  res.send(registeredUser);
});

//---------->Error handeling<-------------------//

app.all("*", (req, res, next) => {
  next(new expressError(404, "No page Found!"));
});

app.use((err, req, res, next) => {
  let { statusCode = 500, message = "Something went insane" } = err;
  // res.status(statusCode).send(message);
  res.status(statusCode).render("error.ejs", { message });
});