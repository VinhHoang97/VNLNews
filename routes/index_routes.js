var express = require("express");
var productModel = require("../models/product_model");
var categoryModel = require("../models/categories_model");
var imageModel = require("../models/image_model");
var commentModel = require("../models/comment_model");
var router = express.Router();

router.get("/", (req, res,next) => {
  var carousel = [];
  var top10 = [];
  var newest10 = [];
  Promise.all([
    productModel.getMostView(4),
    productModel.getMostView(10),
    productModel.getNewest(10),
    categoryModel.all()
  ]).then(([carouselData, top10Data, newest10Data,category]) => {
    new Promise((resolve, reject) => {
      carouselData.forEach((element, index, array) => {
        Promise.all([
          imageModel.getImgByProduct(element.IDBaiViet),
          categoryModel.single(element.ChuyenMuc)
        ]).then(([img, cat]) => {
          carousel.push({
            product: element,
            img: img[0],
            cat: cat[0]
          });
        });
        if (index === array.length - 1) resolve();
      });
    }).then(() => {
      new Promise((resolve, reject) => {
        top10Data.forEach((element, index, array) => {
          Promise.all([
            imageModel.getImgByProduct(element.IDBaiViet),
            categoryModel.single(element.ChuyenMuc),
            commentModel.countByBaiViet(element.IDBaiViet)
          ]).then(([img, cat, countComment]) => {
            top10.push({
              product: element,
              img: img[0],
              cat: cat[0],
              countCmt: countComment[0]
            });
          });
          if (index === array.length - 1) resolve();
        });
      }).then(() => {
        new Promise((resolve, reject) => {
          newest10Data.forEach((element, index, array) => {
            Promise.all([
              imageModel.getImgByProduct(element.IDBaiViet),
              categoryModel.single(element.ChuyenMuc),
              commentModel.countByBaiViet(element.IDBaiViet)
            ]).then(([img, cat, countComment]) => {
              newest10.push({
                product: element,
                img: img[0],
                cat: cat[0],
                countCmt: countComment[0]
              });
            });
            if (index === array.length - 1) resolve();
          });
        }).then(() => {
          res.render("index", {
            carousel: carousel,
            top10: top10,
            newest10: newest10,
            category:category
          });
        });
      });
    });
  }).catch(next);
});

module.exports = router;
