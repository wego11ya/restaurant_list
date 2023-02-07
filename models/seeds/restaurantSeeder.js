// 因為MongoDB連線資料放入.env裡，種子資料會用到資料庫，一開始還是要載入.env
const bcrypt = require("bcryptjs");
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

// 載入json資料庫
const restaurantList = require("../../restaurant.json").results;

// 載入Restaurant Model
const Restaurant = require("../Restaurant");
const User = require("../user");

const db = require("../../config/mongoose");

const SEED_USER = [
  {
    name: "user1",
    email: "user1@example.com",
    password: "12345678",
    indexField: [0, 1, 2],
  },
  {
    name: "user2",
    email: "user2@example.com",
    password: "12345678",
    indexField: [3, 4, 5],
  },
];

// 連線成功
db.once("open", () => {
  Promise.all(
    // 這邊用map是因為要動裡面的值，如果是forEach沒有回傳值
    SEED_USER.map((user) => {
      const { name, email, password, indexField } = user;
      return User.create({
        name,
        email,
        password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
      })
        .then((user) => {
          const userId = user._id;
          const restaurants = indexField.map((index) => {
            return { ...restaurantList[index], userId };
          });
          return Restaurant.create(restaurants);
        })
        .catch((err) => console.log(err));
    })
  ).then(() => {
    console.log("restaurantSeeder done!");
    process.exit();
  });
});
