const Restaurant = require("../Restaurant");
const restaurantList = require("../../restaurant.json").results;
const db = require("../../config/mongoose");

db.once("open", () => {
  console.log("running restaurantSeeder script...");

  Restaurant.create(restaurantList)
    .then(() => {
      console.log("restaurantSeeder done!");
      db.close();
    })
    .catch((err) => console.log(err));
});
