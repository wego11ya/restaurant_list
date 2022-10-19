// 此檔案為總路由器
// 引用Express 與 Express 路由器
const express = require("express");
const router = express.Router();

// 引入home模組
const home = require("./modules/home");

// 引入restaurants模組
const restaurants = require("./modules/restaurants");

// 將網址結構相符的request導入相關模組
router.use("/", home);
//直接在總路由器檢查網址前綴是否以 /restaurants 開頭，有的話才分流到 restaurants 模組裡，因此等下在設定 restaurants 模組時，裡面的路由清單不再需要處理前綴詞 /restaurants
router.use("/restaurants", restaurants);

// 匯出路由器
module.exports = router;
