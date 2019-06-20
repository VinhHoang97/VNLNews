var express = require("express");
var categoriesModel = require("../models/categories_model");
var imageModel = require("../models/image_model");
var tagModel = require("../models/tag_model");
var productModel = require("../models/product_model");
var preProductModel = require("../models/premium_product_model")
var moment = require("moment");
var router = express.Router();

router.post("/", (req, res, next) => {
  if (!res.locals.isPremium) {
    var keyword = req.body.topSearch;
    var products = [];
    console.log(keyword);
    productModel
      .seachProductFullText(keyword)
      .then(rows => {
        console.log(rows);
        if (rows.length < 1) {
          res.render("search", { products: products, repProduct: products[0] });
        }
        var bar = new Promise((resolve, reject) => {
          rows.forEach((element, index, array) => {
            Promise.all([
              imageModel.getImgByProduct(element.IDBaiViet),
              tagModel.singelByBaiViet(element.IDBaiViet)
            ])
              .then(([result, tag]) => {
                console.log(element);
                element.NgayDang = moment(element.NgayDang).format("LL");
                products.push({
                  content: element,
                  img: result[0],
                  Tag: tag
                });
                if (index === array.length - 1) resolve();
              })
              .catch(next);
          });
        })
          .then(() => {
            res.render("search", {
              products: products,
              repProduct: products[0]
            });
          })
          .catch(next);
      })
      .catch(next);
  } else {
    var keyword = req.body.topSearch;
    var products = [];
    console.log(keyword);
    preProductModel
      .seachProductFullText(keyword)
      .then(rows => {
        console.log(rows);
        if (rows.length < 1) {
          res.render("search", { products: products, repProduct: products[0] });
        }
        var bar = new Promise((resolve, reject) => {
          rows.forEach((element, index, array) => {
            Promise.all([
              imageModel.getImgByProduct(element.IDBaiViet),
              tagModel.singelByBaiViet(element.IDBaiViet)
            ])
              .then(([result, tag]) => {
                console.log(element);
                element.NgayDang = moment(element.NgayDang).format("LL");
                products.push({
                  content: element,
                  img: result[0],
                  Tag: tag,
                  isPremium: element.TinhTrangBV === 1 ?true:false
                });
                if (index === array.length - 1) resolve();
              })
              .catch(next);
          });
        })
          .then(() => {
            res.render("search", {
              products: products,
              repProduct: products[0]
            });
          })
          .catch(next);
      })
      .catch(next);
  }
});

module.exports = router;
