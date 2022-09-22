const express = require("express");
const app = express();
const port = 3000;
const exphbs = require("express-handlebars");

app.get("/", (req, res) => {
  res.render("index");
});

//setting template engine
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//setting static files
app.use(express.static("public"));

app.listen(port, () => {
  console.log(`Express is now listening on localhost:3000`);
});
