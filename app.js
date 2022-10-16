const express = require("express");
const app = express();
const port = 3000;
const exphbs = require("express-handlebars");
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const db = mongoose.connection;
const routes = require("./routes");

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

// for each request, use methodOverride to process
app.use(methodOverride("_method"));

// 將request 導入路由器，引入路由器時，路徑設定為 /routes 就會自動去尋找目錄下叫做 index 的檔案
app.use(routes);

//setting template engine
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//setting static files
app.use(express.static("public"));

app.listen(port, () => {
  console.log(`Restaurant List is now listening on http://localhost:3000`);
});
