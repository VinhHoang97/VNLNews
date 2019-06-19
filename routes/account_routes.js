var express = require("express");
var passport = require("passport");
var bcrypt = require("bcrypt");
var userModel = require("../models/user_model");
var moment = require("moment");
var router = express.Router();
var authUser = require("../middlewares/authUser");

router.get("/register", (req, res, next) => {
  res.render("dang_ki");
});

router.post("/register", (req, res, next) => {
  var saltRound = 10;
  console.log(req.body);
  var hash = bcrypt.hashSync(req.body.password, saltRound);
  console.log(
    (req.body.day.length === 1 ? 0 + req.body.day : req.body.day) +
      "/" +
      (req.body.month.length === 1 ? 0 + req.body.month : req.body.month) +
      "/" +
      req.body.year
  );
  var tmp =
    (req.body.day.length === 1 ? 0 + req.body.day : req.body.day) +
    "/" +
    (req.body.month.length === 1 ? 0 + req.body.month : req.body.month) +
    "/" +
    req.body.year;
  var dob = moment(tmp, "DD/MM/YYYY").format("YYYY-MM-DD");
  console.log(dob);
  var entity = {
    UserName: req.body.username,
    Password: hash,
    HoTen: req.body.hoten,
    GioiTinh: req.body.gioitinh,
    Email: req.body.email,
    SDT: req.body.phoneNumber,
    PhanHe: "PH004",
    NgaySinh: dob,
    TinhTrang: "NOT VIP"
  };
  userModel
    .add(entity)
    .then(id => {
      res.redirect("./login");
    })
    .catch(next);
});

router.get("/login", (req, res, next) => {
  res.render("login");
});

router.post("/login", (req, res, next) => {
  passport.authenticate("local", function(err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.render("login", {
        err_message: info.message
      });
    }
    var retUrl = req.query.retUrl || "/";
    req.logIn(user, function(err) {
      if (err) {
        return next(err);
      }
      return res.redirect("/");
    });
  })(req, res, next);
});

router.get("/profile", authUser, (req, res, next) => {
  res.render("profile");
});

router.post("/profile", authUser, (req, res, next) => {
  var saltRound = 10;
  console.log(req.body);
  console.log( res.locals.authAccount.Password);
  var ret = bcrypt.compareSync(
    req.body.oldPassword,
    res.locals.authAccount.Password
  );
  if (!ret) {
    next();
  }
  var hash = bcrypt.hashSync(req.body.newPassword, saltRound);
  console.log(
    (req.body.day.length === 1 ? 0 + req.body.day : req.body.day) +
      "/" +
      (req.body.month.length === 1 ? 0 + req.body.month : req.body.month) +
      "/" +
      req.body.year
  );
  var tmp =
    (req.body.day.length === 1 ? 0 + req.body.day : req.body.day) +
    "/" +
    (req.body.month.length === 1 ? 0 + req.body.month : req.body.month) +
    "/" +
    req.body.year;
  var dob = moment(tmp, "DD/MM/YYYY").format("YYYY-MM-DD");
  console.log(dob);
  var entity = {
    UserName: req.body.username,
    Password: hash,
    HoTen: req.body.hoten,
    GioiTinh: req.body.gioitinh,
    Email: req.body.email,
    SDT: req.body.phoneNumber,
    NgaySinh: dob,
  };
  userModel
    .update(entity)
    .then(id => {
        console.log(id);
      res.redirect("/account/profile");
    })
    .catch(next);
});

router.post("/logout", authUser, (req, res, next) => {
  req.logOut();
  res.redirect("/account/login");
});
module.exports = router;
