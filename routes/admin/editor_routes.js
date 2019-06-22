var express = require("express");
var router = express.Router();
var adminLogin = require("./admin_account_routers");
var productModel = require("../../models/product_model");
var catModel = require("../../models/categories_model");
var tagModel = require("../../models/tag_model");
var tagProModel = require("../../models/tag_product_model");
var imgProModel = require("../../models/img_product_model");
var moment = require("moment");
var imgModel = require("../../models/image_model");
var auth = require("../../middlewares/auth");
var category = require("../../models/categories_model.js");
var multer = require("multer");
var userModel = require("../../models/user_model");
router.get("/", auth, (req, res, next) => {
  if (res.locals.isBTV) {
    var id = res.locals.authUser.ID;
    console.log(id);
    Promise.all([productModel.updateEditor(id), productModel.allEditor(id)]).then(([rows1,rows2])=>{
      res.render("admin/bien_tap_vien", {
        layout: "main_bien_tap_vien.hbs",
        dsdaduyet:rows2.length,
        dschuaduyet:rows1.length
    });
    });
  }
});

router.get("/da_duyet/:id", auth, (req, res, next) => {
  var id = req.params.id;
  productModel
    .updateApprove(id)
    .then(rows => {
      res.redirect("/admin/editor/duyet_bai_viet");
    })
    .catch(next);
});

router.get("/duyet/:id", auth, (req, res) => {
  var id = req.params.id;
  Promise.all([
    productModel.singleForEditor(id),
    catModel.allChildren(),
    tagModel.singelByBaiViet(id),
    imgModel.getImgByProduct(id)
  ]).then(([rows, cat, tag, img]) => {
    var strTag = "";
    tag.forEach((element, index, array) => {
      if (index === array.length - 1) strTag += "#" + element.TenTag;
      else {
        strTag += "#" + element.TenTag + ",";
      }
    });
    console.log(rows[0]);
    console.log(img);
    img[0].urllinkHinh = img[0].urllinkHinh.replace(/\\/g, "/");
    res.render("admin/duyet", {
      layout: "main_bien_tap_vien.hbs",
      product: rows[0],
      isVip: rows[0].TinhTrangBV === 1 ? true : false,
      cat: cat,
      tag: strTag,
      img: img[0]
    });
  });
});

router.get("/duyet_bai_viet", auth, (req, res, next) => {
  var id = res.locals.authUser.ID;
  console.log(id);
  productModel
    .updateEditor(id)
    .then(rows => {
      console.log(rows);
      res.render("admin/duyet_bai_viet", {
        layout: "main_bien_tap_vien.hbs",
        dsbaiduyet: rows
      });
    })
    .catch(next);
});

router.get("/bai_viet_da_duyet", auth, (req, res) => {
  var id = res.locals.authUser.ID;
  productModel
    .allEditor(id)
    .then(rows => {
      res.render("admin/bai_viet_da_duyet", {
        layout: "main_bien_tap_vien.hbs",
        dsbaidaduyet: rows
      });
    })
    .catch(err => {
      console.log(err);
    });
});

router.get("/tu_choi/:id", auth, (req, res) => {
  var id = req.params.id;
  productModel
    .updateDenied(id)
    .then(rows => {
      res.redirect("/admin/editor/duyet_bai_viet");
    })
    .catch(err => {
      console.log(err);
    });
});

module.exports = router;
