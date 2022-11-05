// 此檔案為總路由器
// 引用Express 與 Express 路由器
const express = require("express");
const router = express.Router();
const home = require("./modules/home");
const restaurants = require("./modules/restaurants");
const users = require("./modules/users");

// 將網址結構相符的request導入相關模組
router.use("/", home);
router.use("/restaurants", restaurants);
router.use("/users", users);

// 匯出路由器
module.exports = router;
