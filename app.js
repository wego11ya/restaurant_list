const express = require("express");
const session = require("express-session");
const app = express();
const PORT = 3000; //不知道為什麼如果設定了process.evn.PORT程式會掛掉
const exphbs = require("express-handlebars");
const methodOverride = require("method-override");
const flash = require("connect-flash");
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
console.log(process.env);

const routes = require("./routes");
require("./config/mongoose");

const usePassport = require("./config/passport");

//setting body-parser
app.use(express.urlencoded({ extended: true }));

// for each request, use methodOverride to process
app.use(methodOverride("_method"));

// setting express-session可以幫你截取 cookie 資訊、生成 session，並把 session 資訊存放在伺服器端。
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

// 呼叫 Passport 函式並傳入 app，這條要寫在路由之前
usePassport(app);

app.use(flash());
// 設定本地變數 res.locals, 放在res.locals的資料所有的view都可以存取
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated();
  res.locals.user = req.user;
  res.locals.success_msg = req.flash("success_msg"); // 設定 success_msg 訊息
  res.locals.warning_msg = req.flash("warning_msg"); // 設定 warning_msg 訊息
  next();
});

// 將request 導入路由器，引入路由器時，路徑設定為 /routes 就會自動去尋找目錄下叫做 index 的檔案
app.use(routes);

//setting template engine
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//setting static files
app.use(express.static("public"));

app.listen(PORT, () => {
  console.log(`Restaurant List is now listening on http://localhost:${PORT}`);
});
