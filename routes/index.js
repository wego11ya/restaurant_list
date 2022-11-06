// 此檔案為總路由器
// 引用Express 與 Express 路由器
const express = require("express");
const router = express.Router();
const home = require("./modules/home");
const restaurants = require("./modules/restaurants");
const users = require("./modules/users");
const { authenticator } = require("../middleware/auth"); // 掛載 middleware

// 將網址結構相符的request導入相關模組
router.use("/restaurants", authenticator, restaurants); // 加入驗證程序
router.use("/users", users);
router.use("/", authenticator, home); // 加入驗證程序

// 匯出路由器
module.exports = router;
