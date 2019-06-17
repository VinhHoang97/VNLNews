var express = require("express");
var productModel = require("../models/product_model");
var categoryModel = require("../models/categories_model");
var imageModel = require("../models/image_model");
var commentModel = require("../models/comment_model");
var moment= require('moment');
var router = express.Router();

router.get("/", (req, res, next) => {
  var carousel = [];
  var top10 = [];
  var newest10 = [];
  var TenTopEachChuyenMuc = [];
  Promise.all([
    productModel.getMostView(4),
    productModel.getMostView(10),
    productModel.getNewest(10),
    categoryModel.allChildren()
  ])
    .then(([carouselData, top10Data, newest10Data, category]) => {
      new Promise((resolve, reject) => {
        carouselData.forEach((element, index, array) => {
          Promise.all([
            imageModel.getImgByProduct(element.IDBaiViet),
            categoryModel.single(element.ChuyenMuc)
          ]).then(([img, cat]) => {
            element.NgayDang= moment(element.NgayDang).format('LL');
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
              element.NgayDang= moment(element.NgayDang).format('LL');
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
                element.NgayDang= moment(element.NgayDang).format('LL');
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
            new Promise((resolve, reject) => {
              category.forEach((element, index, array) => {
                productModel
                  .getNewestByCat(element.IDChuyenMuc, 1)
                  .then(rows => {
                    if (rows.length === 0) {
                    } else {
                      Promise.all([
                        imageModel.getImgByProduct(rows[0].IDBaiViet),
                        categoryModel.single(rows[0].ChuyenMuc),
                        commentModel.countByBaiViet(rows[0].IDBaiViet)
                      ]).then(([img, cat, countComment]) => {
                        rows[0].NgayDang= moment(rows[0].NgayDang).format('LL');
                       TenTopEachChuyenMuc.push({
                          product: rows[0],
                          img: img[0],
                          cat: cat[0],
                          countCmt: countComment[0]
                        });
                      });
                    }
                    if (index === array.length - 1) resolve();
                  });
              });
            }).then(() => {
              setTimeout(() => {
                var TenTopEachChuyenMuc1= TenTopEachChuyenMuc.slice(0,Math.floor(TenTopEachChuyenMuc.length/2));
                var TenTopEachChuyenMuc2 = TenTopEachChuyenMuc.slice(Math.floor(TenTopEachChuyenMuc.length/2) ,TenTopEachChuyenMuc.length);

                console.log(TenTopEachChuyenMuc.length);
                console.log(TenTopEachChuyenMuc1.length);
                console.log(TenTopEachChuyenMuc2.length);
                res.render("index", {
                  carousel: carousel,
                  top10: top10,
                  newest10: newest10,
                  category: category,
                  TenTopEachChuyenMuc1: TenTopEachChuyenMuc1,
                  TenTopEachChuyenMuc2: TenTopEachChuyenMuc2,
                  RefTenTop: TenTopEachChuyenMuc[0]
                });
              }, 1000);
            });
          });
        });
      });
    })
    .catch(next);
});

module.exports = router;
