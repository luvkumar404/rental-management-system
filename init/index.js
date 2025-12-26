let mongoose = require("mongoose");
const Listing = require("../models/listing");
let initData = require("./data");

main()
  .then(() => {
    console.log("Connection Successful");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
}

const initDb = async () => {
  await Listing.deleteMany({});
  initData.data = initData.data.map((obj) => ({
    ...obj,
    owner: "67e9a38b7a8d89fd670db99e",
  }));
  await Listing.insertMany(initData.data);
  console.log("Data initialisation Successful...");
};

initDb();