const express = require("express");
const router = express.Router();
const Restaurant = require("../../models/Restaurant");

// Page of creating new restaurant
router.get("/new", (req, res) => {
  res.render("new");
});

// Create new restaurant
router.post("/", (req, res) => {
  const userId = req.user._id;
  // 下面用到...展開運算子
  console.log(req.body);
  Restaurant.create({ ...req.body, userId })
    .then(() => res.redirect("/"))
    .catch((error) => console.log(error));
});

// Show particular restaurant details
router.get("/:id", (req, res) => {
  const userId = req.user._id;
  const _id = req.params.id;
  Restaurant.findOne({ _id, userId })
    .lean()
    .then((restaurant) => res.render("show", { restaurant }))
    .catch((error) => console.log(error));
});

// Edit page
router.get("/:id/edit", (req, res) => {
  const userId = req.user._id;
  const _id = req.params.id;
  Restaurant.findOne({ _id, userId })
    .lean()
    .then((restaurant) => res.render("edit", { restaurant }))
    .catch((error) => console.log(error));
});

// Edit restaurant details
router.put("/:id", (req, res) => {
  const userId = req.user._id;
  const _id = req.params.id;
  Restaurant.findOneAndUpdate({ _id, userId }, req.body)
    .then(() => res.redirect(`/restaurants/${_id}`))
    .catch((error) => console.log(error));
});

// Delete restaurant
router.delete("/:id", (req, res) => {
  const userId = req.user._id;
  const _id = req.params.id;
  Restaurant.findOneAndDelete({ _id, userId })
    .then((restaurant) => restaurant.remove())
    .then(() => res.redirect("/"))
    .catch((error) => console.log(error));
});

module.exports = router;
