var express = require("express");
var categoriesModel = require("../models/categories_model");
var imageModel = require('../models/image_model');
var tagModel = require('../models/tag_model')
var productModel = require("../models/product_model");
var preProductModel = require("../models/premium_product_model");
var router = express.Router();

router.get("/:id", (req, res,next) => {
  if(!res.locals.isPremium){
  var id = req.params.id;
  var page = req.query.page || 1;
  if (page < 1) page = 1;

  var products = [];
  var limit = 3;
  var offset = (page - 1) * limit;

  Promise.all([
    productModel.pageByTag(id, limit, offset),
    productModel.countByTag(id)
  ])
    .then(([rows, count_rows]) => {
        console.log(rows.length);
        if(rows.length <1){
            throw new Error("Don't found any product")
        }
      for (const c of res.locals.categoryFull) {
        if (c.Id === +id) {
          c.isActive = true;
        }
      }
      var total = count_rows[0].total;
      var nPages = Math.floor(total / limit);
      if (total % limit > 0) nPages++;
      var pages = [];
      for (i = 1; i <= nPages; i++) {
        var obj = { value: 1 };
        pages.push(obj);
      }

      var bar = new Promise((resolve, reject) => {
        rows.forEach((element, index, array) => {
          Promise.all([
            imageModel.getImgByProduct(element.IDBaiViet),
            tagModel.singelByBaiViet(element.IDBaiViet)
          ]).then(([result, tag]) => {
            console.log(result)
            console.log(tag);
            products.push({
              content: element,
              img: result[0],
              Tag: tag
            });
            if (index === array.length - 1) resolve();
          });
        });
      })
        .then(() => {
          res.render("single_category", { products: products, pages: pages });
        })
        .catch(err=>{
            console.log(err)
        });
    })
    .catch(next);
  }else{
    var id = req.params.id;
  var page = req.query.page || 1;
  if (page < 1) page = 1;

  var products = [];
  var limit = 3;
  var offset = (page - 1) * limit;

  Promise.all([
    preProductModel.pageByTag(id, limit, offset),
    preProductModel.countByTag(id)
  ])
    .then(([rows, count_rows]) => {
        console.log(rows.length);
        if(rows.length <1){
            throw new Error("Don't found any product")
        }
      for (const c of res.locals.categoryFull) {
        if (c.Id === +id) {
          c.isActive = true;
        }
      }
      var total = count_rows[0].total;
      var nPages = Math.floor(total / limit);
      if (total % limit > 0) nPages++;
      var pages = [];
      for (i = 1; i <= nPages; i++) {
        var obj = { value: 1 };
        pages.push(obj);
      }

      var bar = new Promise((resolve, reject) => {
        rows.forEach((element, index, array) => {
          Promise.all([
            imageModel.getImgByProduct(element.IDBaiViet),
            tagModel.singelByBaiViet(element.IDBaiViet)
          ]).then(([result, tag]) => {
            console.log(result)
            console.log(tag);
            products.push({
              content: element,
              img: result[0],
              Tag: tag,
              isPremium:element.TinhTrangBV === 1? true:false
            });
            if (index === array.length - 1) resolve();
          });
        });
      })
        .then(() => {
          res.render("single_category", { products: products, pages: pages });
        })
        .catch(err=>{
            console.log(err)
        });
    })
    .catch(next);
  }
});

module.exports = router;
