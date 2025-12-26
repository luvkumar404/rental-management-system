// const Listing = require("../models/listing");

// module.exports.index = async (req, res) => {
//   let allListings = await Listing.find();
//   res.render("listings/index.ejs", { allListings });
// };

// module.exports.renderNewForm = (req, res) => {
//   res.render("listings/new.ejs");
// };

// module.exports.postListing = async (req, res, next) => {
//   let newlistings = new Listing(req.body.listings);
//   newlistings.owner = req.user._id;
//   await newlistings.save();
//   req.flash("success", "New Listing Created!");
//   res.redirect("/listings");
// };

// module.exports.renderEditForm = async (req, res) => {
//   let { id } = req.params;
//   let list = await Listing.findById(id);

//   if (!list) {
//     req.flash("error", "Listing does not exits");
//    return res.redirect("/listings");
//   }

//   res.render("listings/edit.ejs", { list });
// };

// module.exports.putEditedListing = async (req, res) => {
//   if (!req.body.listings) {
//     throw new expressError(400, "No listings found!..");
//   }
//   let { id } = req.params;

//   let updated = await Listing.findByIdAndUpdate(id, { ...req.body.listings });
//   req.flash("success", "Listing updated successfully!");
//   res.redirect(`/listings/${id}`);
// };

// module.exports.showListing = async (req, res) => {
//   let { id } = req.params;
//   const listItem = await Listing.findById(id)
//     .populate({ path: "reviews", populate: { path: "author" } })
//     .populate("owner");

//   // listItem.reviews.forEach((review, i) => {
//   //   if (!review.author) {
//   //     console.log(`❌ Review at index ${i} has no author`, review);
//   //   }
//   // });

//   if (!listItem) {
//     req.flash("error", "Listing does not exits");
//     return res.redirect("/listings");
//   }

//   return res.render("listings/show.ejs", { listItem });
// };

// module.exports.deleteListing = async (req, res) => {
//   let { id } = req.params;
//   await Listing.findByIdAndDelete(id);
//   req.flash("success", "Listing deleted successfully!");
//   res.redirect("/listings");
// };

const Listing = require("../models/listing");

module.exports.index = async (req, res, next) => {
  try {
    let allListings = await Listing.find();
    return res.render("listings/index.ejs", { allListings });
  } catch (err) {
    next(err);
  }
};

module.exports.renderNewForm = (req, res) => {
  return res.render("listings/new.ejs");
};

module.exports.postListing = async (req, res, next) => {
  try {
    let url = req.file.path;
    let filename = req.file.filename;
    let newlistings = new Listing(req.body.listings);
    newlistings.owner = req.user._id;
    newlistings.image = { url, filename };
    await newlistings.save();
    req.flash("success", "New Listing Created!");
    return res.redirect("/listings");
  } catch (err) {
    next(err);
  }
};

module.exports.renderEditForm = async (req, res, next) => {
  try {
    let { id } = req.params;
    let list = await Listing.findById(id);

    if (!list) {
      req.flash("error", "Listing does not exist");
      return res.redirect("/listings");
    }
    let originalUrl = list.image.url;
    let originalImageUrl=originalUrl.replace("/upload","/upload/w_250")

    return res.render("listings/edit.ejs", { list ,originalImageUrl});
  } catch (err) {
    next(err);
  }
};

module.exports.putEditedListing = async (req, res, next) => {
  try {
    if (!req.body.listings) {
      req.flash("error", "No listings found!..");
      return res.redirect("/listings");
    }

    let { id } = req.params;
    let updated = await Listing.findByIdAndUpdate(id, { ...req.body.listings });

    if (typeof req.file !== "undefined") {
      let url = req.file.path;
      let filename = req.file.filename;
      updated.image = { url, filename };
      await updated.save();
    }
    req.flash("success", "Listing updated successfully!");
    return res.redirect(`/listings/${id}`);
  } catch (err) {
    next(err);
  }
};

module.exports.showListing = async (req, res, next) => {
  try {
    let { id } = req.params;
    const listItem = await Listing.findById(id)
      .populate({ path: "reviews", populate: { path: "author" } })
      .populate("owner");

    if (!listItem) {
      req.flash("error", "Listing does not exist");
      return res.redirect("/listings");
    }

    return res.render("listings/show.ejs", { listItem });
  } catch (err) {
    next(err);
  }
};

module.exports.deleteListing = async (req, res, next) => {
  try {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing deleted successfully!");
    return res.redirect("/listings");
  } catch (err) {
    next(err);
  }
};