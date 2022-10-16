const express = require("express");
const router = express.Router();
const Restaurant = require("../../models/Restaurant");

// Search function
router.get("/", (req, res) => {
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

module.exports = router;
