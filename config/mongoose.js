const mongoose = require("mongoose");
const db = mongoose.connection;
// mongoose connection
mongoose.connect(process.env.MONGODB_URI);

db.on("error", () => {
  console.log("mogodb error!");
});

db.once("open", () => {
  console.log("mongodb connected!");
});

module.exports = db;
