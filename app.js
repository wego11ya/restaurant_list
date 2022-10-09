const express = require("express");
const app = express();
const port = 3000;
const exphbs = require("express-handlebars");
const restaurantList = require("./restaurant.json");
const mongoose = require("mongoose");
const db = mongoose.connection;

mongoose.connect(process.env.MONGODB_URI);

db.on("error", () => {
  console.log("mogodb error!");
});

db.once("open", () => {
  console.log("mongodb connected!");
});

app.get("/", (req, res) => {
  res.render("index", { restaurants: restaurantList.results });
});

app.get("/restaurants/:restaurant_id", (req, res) => {
  const restaurant = restaurantList.results.find(
    (restaurant) => restaurant.id.toString() === req.params.restaurant_id
  );
  res.render("show", { restaurant: restaurant });
});

app.get("/search", (req, res) => {
  const keyword = req.query.keyword.trim().toLowerCase();
  const restaurants = restaurantList.results.filter((restaurant) => {
    return (
      restaurant.name.toLowerCase().includes(keyword) ||
      restaurant.category.includes(keyword)
    );
  });
  res.render("index", { restaurants: restaurants, keyword: keyword });
});
//setting template engine
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//setting static files
app.use(express.static("public"));

app.listen(port, () => {
  console.log(`Express is now listening on localhost:3000`);
});
