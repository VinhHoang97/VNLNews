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
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/img/product_img");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

var upload = multer({ storage });
router.get("/", (req, res, next) => {
  if (res.locals.isPV) {
    res.render("admin/phong_vien", {
      layout: "main_phong_vien.hbs"
    })
      .catch(next);
  }
});

router.get("/xem_danh_sach_bai_viet", auth, (req, res) => {
  var id = res.locals.authUser.ID
  productModel
    .allProductOfWriter(id)
    .then(rows => {
      res.render("admin/xem_danh_sach_bai_viet", {
        layout: "main_phong_vien.hbs",
        dsbaiviet: rows
      });
    })
    .catch(err => {
      console.log(err);
    });
});

router.get("/hieu_chinh_bai_viet", auth, (req, res) => {
  var id = res.locals.authUser.ID
  productModel
    .updateProductOfWriter(id)
    .then(rows => {
      console.log(rows);
      res.render("admin/hieu_chinh_bai_viet", {
        layout: "main_phong_vien.hbs",
        dshieuchinh: rows
      });
    })
    .catch(err => {
      console.log(err);
    });
});

router.get("/hieu_chinh/:id", auth, (req, res) => {
  var id = req.params.id;
  Promise.all([
    productModel.updatesingle(id),
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
    res.render("admin/hieu_chinh", {
      layout: "main_phong_vien.hbs",
      product: rows[0],
      isVip: rows[0].TinhTrangBV === 1 ? true : false,
      cat: cat,
      tag: strTag,
      img: img[0]
    });
  });
});

router.post("/hieu_chinh/:id", auth, (req, res, next) => {
  var id = req.params.id;
  var cat = req.body.cat;
  var title = req.body.title;
  var FullDes = req.body.FullDes;
  var summary = req.body.summary;
  var premium = req.body.premium;
  var entityProduct = {
    IDBaiViet: id,
    TieuDe: title,
    TieuDe_KhongDau: "",
    ChuyenMuc: cat,
    NgayDang: moment().format("YYYY-MM-DD HH:mm:ss"),
    NoiDung: FullDes,
    TomTat: summary,
    PhongVien: res.locals.authUser.ID,
    BienTapVien: 3,
    DaDuyet: 4,
    TinhTrangBV: premium
  };
  Promise.all([productModel.update(entityProduct)]).then(([product]) => {
    res.redirect("/admin/hieu_chinh_bai_viet");
  })
    .catch(next);
  // var link = req.file.path;
  console.log(cat, title, FullDes, summary, tag, premium);
});

router.get("/upload", auth, (req, res, next) => {
  catModel.allChildren().then(rows => {
    res.render("admin/upload", {
      layout: "main_phong_vien.hbs",
      cat: rows
    });
  });
});

router.post("/upload", auth, upload.single("fuMain"), (req, res, next) => {
  var cat = req.body.cat;
  var title = req.body.title;
  var FullDes = req.body.FullDes;
  var summary = req.body.summary;
  var tag = req.body.tag;
  var premium = req.body.premium;
  if (!req.file) {
    res.json({
      // console.log(req.file);
    });
  } else {
    var entityProduct = {
      TieuDe: title,
      TieuDe_KhongDau: "",
      ChuyenMuc: cat,
      NgayDang: moment().format("YYYY-MM-DD HH:mm:ss"),
      NoiDung: FullDes,
      TomTat: summary,
      PhongVien: res.locals.authUser.ID,
      BienTapVien: 3,
      DaDuyet: 4,
      TinhTrangBV: premium
    };

    var entityHinh = {
      urllinkHinh: req.file.path.substring(7)
    };
    var TagArr = tag.split(",");
    Promise.all([productModel.add(entityProduct), imgModel.add(entityHinh)])
      .then(([product, img]) => {
        var bar = new Promise((resolve, reject) => {
          TagArr.forEach((element, index, array) => {
            var tagEntity = {
              TenTag: element
            };
            tagModel.add(tagEntity).then(rows => {
              var entity = {
                IDBaiViet: product,
                IDTag: rows
              };
              tagProModel.add(entity);
            });
            if (index === array.length - 1) resolve();
          });
        });
        var imgProEntity = {
          IDBaiViet: product,
          IDHinh: img
        };
        Promise.all([bar, imgProModel.add(imgProEntity)])
          .then(([result, id]) => {
            res.redirect("/admin/writer/upload")
            console.log(id);
          }).catch(next);
        console.log(product, img);
      })
      .catch(next);

    console.log(req.file.path.substring(7));
    // var link = req.file.path;
    console.log(cat, title, FullDes, summary, tag, premium);
  }
});

module.exports = router;
