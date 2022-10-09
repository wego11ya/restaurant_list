const mongoose = require("mongoose");
const Restaurant = require("../Restaurant");
const restaurantList = require("../../restaurant.json").results;

mongoose.connect(process.env.MONGODB_URI);

const db = mongoose.connection;

db.on("error", () => {
  console.log("mongodb error!");
});

db.once("open", () => {
  console.log("running restaurantSeeder script...");

  Restaurant.create(restaurantList)
    .then(() => {
      console.log("restaurantSeeder done!");
      db.close();
    })
    .catch((err) => console.log(err));
});
