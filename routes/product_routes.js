var express = require("express");
var productModel = require("../models/product_model");
var preProductModel = require("../models/premium_product_model");
var categoryModel = require("../models/categories_model");
var tagModel = require("../models/tag_model");
var imageModel = require("../models/image_model");
var commentModel = require("../models/comment_model");
var authUser = require("../middlewares/authUser");
var moment = require("moment");
var router = express.Router();

router.get("/productByCategory/:id", (req, res, next) => {
  //throw new Error('bomb')
  if (!res.locals.isPremium) {
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
        if (rows.length < 1) {
          throw new Error("Don't found any product");
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
            ])
              .then(([result, tag]) => {
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
            res.render("single_category", { products: products, pages: pages });
          })
          .catch(next);
      })
      .catch(next);
  } else {
    var id = req.params.id;
    var page = req.query.page || 1;
    if (page < 1) page = 1;

    var products = [];
    var limit = 3;
    var offset = (page - 1) * limit;

    Promise.all([
      preProductModel.pageByCategory(id, limit, offset),
      preProductModel.countByCategory(id)
    ])
      .then(([rows, count_rows]) => {
        if (rows.length < 1) {
          throw new Error("Don't found any product");
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
            ])
              .then(([result, tag]) => {
                element.NgayDang = moment(element.NgayDang).format("LL");
                products.push({
                  content: element,
                  img: result[0],
                  Tag: tag,
                  isPremium: element.TinhTrangBV === 1 ? true : false
                });
                if (index === array.length - 1) resolve();
              })
              .catch(next);
          });
        })
          .then(() => {
            res.render("single_category", { products: products, pages: pages });
          })
          .catch(next);
      })
      .catch(next);
  }
});

router.get("/productByParentCategory/:id", (req, res, next) => {
  if (!res.locals.isPremium) {
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
        if (rows.length < 1) {
          throw new Error("Don't found any product");
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
          var obj = { value: i, active: i === +page };
          pages.push(obj);
        }
        console.log(pages);
        var bar = new Promise((resolve, reject) => {
          rows.forEach((element, index, array) => {
            Promise.all([
              imageModel.getImgByProduct(element.IDBaiViet),
              tagModel.singelByBaiViet(element.IDBaiViet)
            ])
              .then(([result, tag]) => {
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
            res.render("single_category", { products: products, pages: pages });
          })
          .catch(next);
      })
      .catch(next);
  } else {
    var id = req.params.id;
    var page = req.query.page || 1;
    if (page < 1) page = 1;

    var products = [];
    var limit = 3;
    var offset = (page - 1) * limit;

    Promise.all([
      preProductModel.pageByParentCategory(id, limit, offset),
      preProductModel.countByParentCategory(id)
    ])
      .then(([rows, count_rows]) => {
        if (rows.length < 1) {
          throw new Error("Don't found any product");
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
          var obj = { value: i, active: i === +page };
          pages.push(obj);
        }
        console.log(pages);
        var bar = new Promise((resolve, reject) => {
          rows.forEach((element, index, array) => {
            Promise.all([
              imageModel.getImgByProduct(element.IDBaiViet),
              tagModel.singelByBaiViet(element.IDBaiViet)
            ])
              .then(([result, tag]) => {
                element.NgayDang = moment(element.NgayDang).format("LL");
                products.push({
                  content: element,
                  img: result[0],
                  Tag: tag,
                  isPremium: element.TinhTrangBV === 1 ? true : false
                });
                if (index === array.length - 1) resolve();
              })
              .catch(next);
          });
        })
          .then(() => {
            res.render("single_category", { products: products, pages: pages });
          })
          .catch(next);
      })
      .catch(next);
  }
});

router.get("/:id", (req, res, next) => {
  if (!res.locals.isPremium) {
    var similarProduct = [];
    var id = req.params.id;
    productModel
      .single(id)
      .then(rows => {
        var bar = Promise.all([
          categoryModel.single(rows[0].ChuyenMuc),
          imageModel.getImgByProduct(rows[0].IDBaiViet),
          commentModel.singelByBaiViet(rows[0].IDBaiViet)
        ])
          .then(([category, img, comment]) => {
            rows[0].NgayDang = moment(rows[0].NgayDang).format("LL");
            img[0].urllinkHinh = img[0].urllinkHinh.replace(/\\/g, "/");
            productModel
              .similarCategoryProduct(category[0].IDChuyenMuc, id)
              .then(listResult => {
                if(listResult.length!=0){
                  var bar = new Promise((resolve, reject) => {
                    listResult.forEach((element, index, array) => {
                      Promise.all([
                        imageModel.getImgByProduct(element.IDBaiViet),
                        tagModel.singelByBaiViet(element.IDBaiViet),
                        commentModel.countByBaiViet(element.IDBaiViet)
                      ])
                        .then(([result, tag, commentCount]) => {
                          element.NgayDang = moment(element.NgayDang).format(
                            "LL"
                          );
                          similarProduct.push({
                            content: element,
                            img: result[0],
                            Tag: tag,
                            countCmt: commentCount.total,
                            isPremium: element.TinhTrangBV === 1 ? true : false
                          });
                          if (index === array.length - 1) resolve();
                        })
                        .catch(next);
                    });
                  })
                    .then(() => {
                      res.render("single_product", {
                        product: rows[0],
                        category: category[0],
                        img: img[0],
                        comment: comment,
                        isPremium: rows[0].TinhTrangBV === 1 ? true : false,
                        message: req.session.message,
                        similarProduct: similarProduct
                      });
                    })
                    .catch(next);
                }
                else{
                  res.render("single_product", {
                    product: rows[0],
                    category: category[0],
                    img: img[0],
                    comment: comment,
                    isPremium: rows[0].TinhTrangBV === 1 ? true : false,
                    message: req.session.message,
                    similarProduct: similarProduct
                  });
                }
              })
              .catch(next);
          })
          .catch(next);
      })
      .catch(next);
  } else {
    var similarProduct = [];
    var id = req.params.id;
    productModel
      .single(id)
      .then(rows => {
        var bar = Promise.all([
          categoryModel.single(rows[0].ChuyenMuc),
          imageModel.getImgByProduct(rows[0].IDBaiViet),
          commentModel.singelByBaiViet(rows[0].IDBaiViet)
        ])
          .then(([category, img, comment]) => {
            rows[0].NgayDang = moment(rows[0].NgayDang).format("LL");
            img[0].urllinkHinh = img[0].urllinkHinh.replace(/\\/g, "/");
            preProductModel
              .similarCategoryProduct(category[0].IDChuyenMuc, id)
              .then(listResult => {
                if(listResult.length!=0){
                  var bar = new Promise((resolve, reject) => {
                    listResult.forEach((element, index, array) => {
                      Promise.all([
                        imageModel.getImgByProduct(element.IDBaiViet),
                        tagModel.singelByBaiViet(element.IDBaiViet),
                        commentModel.countByBaiViet(element.IDBaiViet)
                      ])
                        .then(([result, tag, commentCount]) => {
                          element.NgayDang = moment(element.NgayDang).format(
                            "LL"
                          );
                          similarProduct.push({
                            content: element,
                            img: result[0],
                            Tag: tag,
                            countCmt: commentCount.total,
                            isPremium: element.TinhTrangBV === 1 ? true : false
                          });
                          if (index === array.length - 1) resolve();
                        })
                        .catch(next);
                    });
                  })
                    .then(() => {
                      res.render("single_product", {
                        product: rows[0],
                        category: category[0],
                        img: img[0],
                        comment: comment,
                        isPremium: rows[0].TinhTrangBV === 1 ? true : false,
                        message: req.session.message,
                        similarProduct: similarProduct
                      });
                    })
                    .catch(next);
                }
                else{
                  res.render("single_product", {
                    product: rows[0],
                    category: category[0],
                    img: img[0],
                    comment: comment,
                    isPremium: rows[0].TinhTrangBV === 1 ? true : false,
                    message: req.session.message,
                    similarProduct: similarProduct
                  });
                }
              })
              .catch(next);
          })
          .catch(next);
      })
      .catch(next);
  }
});

router.post("/:id/comment", authUser, (req, res, next) => {
  console.log(req.body);
  var commentEntity = {
    BaiViet: req.params.id,
    DocGia: res.locals.authAccount.ID,
    NoiDung: req.body.message,
    TinhTrang: 0
  };
  commentModel
    .add(commentEntity)
    .then(id => {
      console.log(id);
      res.redirect("/products/" + req.params.id);
    })
    .catch(next);
});

router.get("/:id/comment", authUser, (req, res, next) => {
  res.redirect("/products/" + req.params.id);
});
module.exports = router;
