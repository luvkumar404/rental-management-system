const mongoose = require("mongoose");
// const { schema } = require("./reviews");
let Schema = mongoose.Schema;
const Review = require("./reviews");
const User = require("./user");
const { listingSchema } = require("../schema");

let newListing = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,

  image: {
    url: String,
    filename:String,
  },

  price: Number,
  location: String,
  country: String,
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  owner: {
    type: Schema.Types.ObjectId,
    ref:"User",
  }
});

newListing.post("findOneAndDelete", async (listing) => {
  if (listing) {
    await Review.deleteMany({ _id: { $in: listing.reviews } });
  }
});

let Listing = new mongoose.model("Listing", newListing);

module.exports = Listing;