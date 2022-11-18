const express = require("express");
const router = express.Router();
const User = require("../../models/user");
// 引用 passport
const passport = require("passport");
const bcrypt = require("bcryptjs");

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/users/login",
  })
);
router.get("/logout", (req, res) => {
  req.logout();
  req.flash("success_msg", "你已經成功登出");
  res.redirect("/users/login");
});
router.get("/register", (req, res) => {
  res.render("register");
});
router.post("/register", (req, res) => {
  // 取得註冊表單參數
  const { name, email, password, confirmPassword } = req.body;
  const errors = [];
  if (!email) {
    errors.push({ message: "請填寫Email欄位" });
  }
  if (!password) {
    errors.push({ message: "請填寫Password欄位" });
  }
  if (!confirmPassword) {
    errors.push({ message: "請填寫Confirm Password欄位" });
  }
  if (password !== confirmPassword) {
    errors.push({ message: "密碼與確認密碼不相符！" });
  }
  if (errors.length) {
    return res.render("register", {
      errors,
      name,
      email,
      password,
      confirmPassword,
    });
  }
  // 檢查使用者是否已經註冊
  User.findOne({ email })
    .then((user) => {
      // 如果已經註冊：退回原本畫面
      if (user) {
        errors.push({ message: "這個 Email 已經註冊過了。" });
        res.render("register", {
          errors,
          name,
          email,
          password,
          confirmPassword,
        });
      }
      // 如果還沒註冊：寫入資料庫
      bcrypt
        .genSalt(10)
        .then((salt) => bcrypt.hash(password, salt))
        .then((hash) =>
          User.create({
            name,
            email,
            password: hash,
          })
        )
        .then(() => res.redirect("/"))
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
});

router.get("/login", (req, res) => {
  res.render("login");
});

module.exports = router;
