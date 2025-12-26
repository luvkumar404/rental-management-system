const express = require("express");
const router = express.Router({ mergeParams: true }); 
const wrapAsync = require("../utils/wrapAsync"); 
const { validateReview, isLoggedIn, isReviewAuthor } = require("../middleware");
const reviewController=require("../controllers/reviews.js")

//---------->Review Route<-------------------//

router.post(
  "/",
  isLoggedIn,
  validateReview,

  wrapAsync(reviewController.postReview)
);

//---------->Delete Review Route<-------------------//

router.delete(
  "/:reviewId",
  isLoggedIn,
  isReviewAuthor,
  wrapAsync(reviewController.deleteReview)
);

module.exports = router;