// 引用 Express 與 Express 路由器
const express = require("express");
const router = express.Router();

// 引用 Restaurant Model
const Restaurant = require("../../models/Restaurant");

// review all restaurants
router.get("/", (req, res) => {
  Restaurant.find()
    .lean()
    .sort({ _id: "asc" })
    .then((restaurants) => res.render("index", { restaurants }))
    .catch((error) => console.log(error));
});

// 匯出路由模組
module.exports = router;
