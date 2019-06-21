var express = require("express");
var passport = require("passport");
var bcrypt = require("bcrypt");
var userModel = require("../models/user_model");
var moment = require("moment");
var router = express.Router();
var authUser = require("../middlewares/authUser");
var axios = require("axios");

router.get("/register", (req, res, next) => {
  res.render("dang_ki");
});

router.post("/register", (req, res, next) => {
  // g-recaptcha-response is the key that browser will generate upon form submit.
  // if its blank or null means user has not selected the captcha, so return the error.
  if (
    req.body["g-recaptcha-response"] === undefined ||
    req.body["g-recaptcha-response"] === "" ||
    req.body["g-recaptcha-response"] === null
  ) {
    return next();
  }
  // Put your secret key here.
  var secretKey = "6Lcj7qkUAAAAAKWZgGiTcVT-bwNa5g4bCHcLfNPu";
  // req.connection.remoteAddress will provide IP address of connected user.
  var verificationUrl =
    "https://www.google.com/recaptcha/api/siteverify?secret=" +
    secretKey +
    "&response=" +
    req.body["g-recaptcha-response"] +
    "&remoteip=" +
    req.connection.remoteAddress;
  // Hitting GET request to the URL, Google will respond with success or error scenario.
  axios.post(verificationUrl).then( body => {
    console.log(body.data);
    body = body.data;
    // Success will be true or false depending upon captcha validation.
    if (body.success !== undefined && !body.success) {
      return next();
    } else {
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
        NgayDangKy: moment().format(),
        NgayHetHan: moment()
          .add(7, "days")
          .format(),
        PhanHe: "PH004",
        NgaySinh: dob,
        TinhTrang: "VIP"
      };
      userModel
        .add(entity)
        .then(id => {
          res.redirect("./login");
        })
        .catch(next);
    }
  }).catch(next);
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
      } else {
        res.redirect(req.session.returnTo || "/");
        delete req.session.returnTo;
      }
    });
  })(req, res, next);
});

router.get("/profile", authUser, (req, res, next) => {
  var split = res.locals.authAccount.NgaySinh.split("-");
  res.render("profile", {
    day: split[2],
    month: split[1],
    year: split[0]
  });
});

router.post("/profile", authUser, (req, res, next) => {
  var saltRound = 10;
  console.log(req.body);
  console.log(res.locals.authAccount.Password);
  var ret = bcrypt.compareSync(
    req.body.oldPassword,
    res.locals.authAccount.Password
  );
  if (!ret) {
    next();
  }
  var hash = bcrypt.hashSync(req.body.newPassword, saltRound);
  var tmp =
    (req.body.day.length === 1 ? 0 + req.body.day : req.body.day) +
    "/" +
    (req.body.month.length === 1 ? 0 + req.body.month : req.body.month) +
    "/" +
    req.body.year;
  var dob = moment(tmp, "DD/MM/YYYY").format("YYYY-MM-DD");
  console.log(dob);
  var entity = {
    ID: res.locals.authAccount.ID,
    Password: hash,
    HoTen:
      req.body.hoten === undefined
        ? res.locals.authAccount.HoTen
        : req.body.hoten,
    GioiTinh: req.body.gioitinh,
    Email:
      req.body.email === undefined
        ? res.locals.authAccount.Email
        : req.body.email,
    SDT:
      req.body.phoneNumber === undefined
        ? res.locals.authAccount.SDT
        : req.body.phoneNumber,
    NgaySinh: dob
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
