const express = require("express");
const app = express();
const port = 3000;
const exphbs = require("express-handlebars");
const restaurantList = require("./restaurant.json");
const mongoose = require("mongoose");
const db = mongoose.connection;
const Restaurant = require("./models/Restaurant");

mongoose.connect(process.env.MONGODB_URI);

db.on("error", () => {
  console.log("mogodb error!");
});

db.once("open", () => {
  console.log("mongodb connected!");
});

//setting body-parser
app.use(express.urlencoded({ extended: true }));

// review all restaurants
app.get("/", (req, res) => {
  Restaurant.find()
    .lean()
    .then((restaurants) => res.render("index", { restaurants }))
    .catch((error) => console.log(error));
});

// Page of creating new restaurant
app.get("/restaurants/new", (req, res) => {
  res.render("new");
});

// Create new restaurant
app.post("/restaurants", (req, res) => {
  Restaurant.create(req.body)
    .then(() => res.redirect("/"))
    .catch((error) => console.log(error));
});

// Show particular restaurant details
app.get("/restaurants/:id", (req, res) => {
  const id = req.params.id;
  Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render("show", { restaurant }))
    .catch((error) => console.log(error));
});

// Show edit page
app.get("/restaurants/:id/edit", (req, res) => {
  const id = req.params.id;
  Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render("edit", { restaurant }))
    .catch((error) => console.log(error));
});

// Edit restaurant details
app.post("/restaurants/:id", (req, res) => {
  const id = req.params.id;
  return Restaurant.findById(id)
    .then((restaurant) => {
      restaurant = req.body;
      return restaurant.save();
    })
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch((error) => console.log(error));
});

// Delete restaurant
app.post("/restaurants/:id/delete", (req, res) => {
  const id = req.params.id;
  Restaurant.findById(id)
    .then((restaurant) => restaurant.remove())
    .then(() => res.redirect("/"))
    .catch((error) => console.log(error));
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
