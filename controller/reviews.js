// const Review = require("../models/reviews.js");
// const Listing = require("../models/listing");

// module.exports.postReview = async (req, res) => {
//   let listing = await Listing.findById(req.params.id);

//   let newReview = new Review(req.body.review);
//   newReview.author = req.user._id;

//   listing.reviews.push(newReview);

//   await newReview.save();
//   await listing.save();

//   req.flash("success", "Review Added!");
//   res.redirect(`/listings/${req.params.id}`);
// };

// module.exports.deleteReview = async (req, res) => {
//   let { id, reviewId } = req.params;

//   await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
//   await Review.findByIdAndDelete(reviewId);
//   req.flash("success", "Review deleted!");
//   res.redirect(`/listings/${req.params.id}`);
// };


const Review = require("../models/reviews.js");
const Listing = require("../models/listing");

module.exports.postReview = async (req, res, next) => {
  try {
    let listing = await Listing.findById(req.params.id);

    if (!listing) {
      req.flash("error", "Listing not found");
      return res.redirect("/listings");
    }

    let newReview = new Review(req.body.review);
    newReview.author = req.user._id;

    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();

    req.flash("success", "Review Added!");
    return res.redirect(`/listings/${req.params.id}`);
  } catch (err) {
    next(err);
  }
};

module.exports.deleteReview = async (req, res, next) => {
  try {
    let { id, reviewId } = req.params;

    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);

    req.flash("success", "Review deleted!");
    return res.redirect(`/listings/${req.params.id}`);
  } catch (err) {
    next(err);
  }
};