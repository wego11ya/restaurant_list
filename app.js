const express = require("express");
const app = express();
const port = 3000;
const exphbs = require("express-handlebars");
const restaurantList = require("./restaurant.json");
const mongoose = require("mongoose");
const db = mongoose.connection;
const Restaurant = require("./models/Restaurant");

// mongoose connection
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

// Edit page
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
  Restaurant.findByIdAndUpdate(id, req.body)
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

// Search function
app.get("/search", (req, res) => {
  const keyword = req.query.keyword;

  Restaurant.find()
    .lean()
    .then((restaurants) => {
      const filteredRestaurants = restaurants.filter((data) => {
        return (
          data.name.toLowerCase().includes(keyword.toLowerCase()) ||
          data.category.includes(keyword)
        );
      });
      res.render("index", { restaurants: filteredRestaurants, keyword });
    })
    .catch((error) => console.log(error));
});

//setting template engine
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//setting static files
app.use(express.static("public"));

app.listen(port, () => {
  console.log(`Restaurant List is now listening on http://localhost:3000`);
});
