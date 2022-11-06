const express = require("express");
const session = require("express-session");
const app = express();
const port = 3000;
const exphbs = require("express-handlebars");
const methodOverride = require("method-override");

const routes = require("./routes");
require("./config/mongoose");

//setting body-parser
app.use(express.urlencoded({ extended: true }));

// for each request, use methodOverride to process
app.use(methodOverride("_method"));

// 將request 導入路由器，引入路由器時，路徑設定為 /routes 就會自動去尋找目錄下叫做 index 的檔案
app.use(routes);

//setting template engine
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// setting express-session可以幫你截取 cookie 資訊、生成 session，並把 session 資訊存放在伺服器端。
app.use(
  session({
    secret: "ThisIsMySecret",
    resave: false,
    saveUninitialized: true,
  })
);

//setting static files
app.use(express.static("public"));

app.listen(port, () => {
  console.log(`Restaurant List is now listening on http://localhost:3000`);
});
