// 引用 Express 與 Express 路由器
const express = require("express");
const router = express.Router();

// 引用 Restaurant Model
const Restaurant = require("../../models/Restaurant");

// require sorting function
const sorting = require("../../utilities/sort");

// show all restaurants
router.get("/", (req, res) => {
  Restaurant.find()
    .lean()
    .sort({ name: "asc" })
    .then((restaurants) => res.render("index", { restaurants }))
    .catch((error) => console.log(error));
});

// Search function
router.get("/search", (req, res) => {
  console.log(req.query.sortingType);
  const keyword = req.query.keyword;
  const sortingType = req.query.sortingType;

  Restaurant.find()
    .lean()
    .sort(sorting(sortingType))
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

// 匯出路由模組
module.exports = router;
