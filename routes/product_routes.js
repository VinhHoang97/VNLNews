var express = require("express");
var productModel = require("../models/product_model");
var categoryModel = require("../models/categories_model");
var imageModel = require("../models/image_model");
var router = express.Router();

router.get("/productByCategory/:id", (req, res, next) => {
  //throw new Error('bomb')

  var id = req.params.id;
  var page = req.query.page || 1;
  if (page < 1) page = 1;

  var products = [];
  var limit = 3;
  var offset = (page - 1) * limit;

  Promise.all([
    productModel.pageByCategory(id, limit, offset),
    productModel.countByCategory(id)
  ])
    .then(([rows, count_rows]) => {
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
          imageModel.getImgByProduct(element.IDBaiViet).then(result => {
            products.push({
              content: element,
              img: result[0]
            });
            if (index === array.length - 1) resolve();
          });
        });
      })
        .then(() => {
          res.render("single_category", { products: products, pages: pages });
        })
        .catch(next);
    })
    .catch(next);
});

router.get("/productByParentCategory/:id", (req, res,next) => {
  var id = req.params.id;
  var page = req.query.page || 1;
  if (page < 1) page = 1;

  var products = [];
  var limit = 3;
  var offset = (page - 1) * limit;

  Promise.all([
    productModel.pageByParentCategory(id, limit, offset),
    productModel.countByParentCategory(id)
  ])
    .then(([rows, count_rows]) => {
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
        var obj = { value: i,active: i=== +page };
        pages.push(obj);
      }
      console.log(pages);
      var bar = new Promise((resolve, reject) => {
        rows.forEach((element, index, array) => {
          imageModel.getImgByProduct(element.IDBaiViet).then(result => {
            products.push({
              content: element,
              img: result[0]
            });
            if (index === array.length - 1) resolve();
          });
        });
      })
        .then(() => {
          res.render("single_category", { products: products, pages: pages });
        })
        .catch(next);
    })
    .catch(()=>{
      throw new Error('Không tìm thấy bài viết phù hợp');
    });
});

router.get("/:id", (req, res,next) => {
  var id = req.params.id;
  console.log(id);

  productModel
    .single(id)
    .then(rows => {
      var bar = Promise.all([
        categoryModel.single(rows[0].ChuyenMuc),
        imageModel.getImgByProduct(rows[0].IDBaiViet)
      ]).then(([category, img]) => {
        console.log(img);
        console.log(category);
        res.render("single_product", {
          product: rows[0],
          category: category[0],
          img: img[0]
        });
      });
    })
    .catch(next);
});

module.exports = router;
