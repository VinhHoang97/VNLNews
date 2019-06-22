var express = require("express");
var router = express.Router();
var adminLogin = require("./admin_account_routers");
var productModel = require("../../models/product_model");
var catModel = require("../../models/categories_model");
var tagModel = require("../../models/tag_model");
var tagProModel = require("../../models/tag_product_model");
var imgProModel = require("../../models/img_product_model");
var btvCatModel = require("../../models/editor_category_model");
var moment = require("moment");
var imgModel = require("../../models/image_model");
var auth = require("../../middlewares/auth");
var category = require("../../models/categories_model.js");
var multer = require("multer");
var userModel = require("../../models/user_model");
var moment = require("moment");
var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./public/img/product_img");
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});

var upload = multer({ storage });

//require('../../middlewares/view-engine')(router);

router.get("/", (req, res) => {
  if (res.locals.isAdmin) {
    res.redirect("/admin/manager/trang_chu");
  }
});

router.get("/trang_chu", auth, (req, res) => {
  Promise.all([
    category.allCount(),
    productModel.allCountBV(),
    userModel.allCountTV()
  ])
    .then(([rows, rows2, rows3]) => {
      res.render("admin/admin", {
        layout: "main_admin.hbs",
        TongDanhMuc: rows[0].Total,
        TongBaiViet: rows2[0].Total,
        TongThanhVien: rows3[0].Total
      });
    })
    .catch(err => {
      console.log(err);
    });
});

router.get("/xem_phong_vien", auth, (req, res) => {
  userModel
    .allPV()
    .then(rows => {
      res.render("admin/xem_phong_vien", {
        layout: "main_admin.hbs",
        dsphongvien: rows
      });
    })
    .catch(err => {
      console.log(err);
    });
});

router.get("/xem_thanh_vien", auth, (req, res, next) => {
  userModel
    .allDG()
    .then(rows => {
      rows.forEach(element => {
        element.NgayDangKy = moment(element.NgayDangKy).format("LL");
        element.NgayHetHan = moment(element.NgayHetHan).format("LL");
      });
      res.render("admin/xem_thanh_vien", {
        layout: "main_admin.hbs",
        dsdocgia: rows
      });
    })
    .catch(next);
});

router.get("/giahan/:id", auth, (req, res, next) => {
  var id = req.params.id;
  var entity = {
    ID: id,
    NgayHetHan: moment()
      .add(7, "days")
      .format()
  };
  userModel
    .update(entity)
    .then(rows => {
      res.redirect("../xem_thanh_vien");
    })
    .catch(next);
});

router.get("/xem_editor", auth, (req, res,next) => {
  userModel
    .allBTV()
    .then(rows => {
      var list = [];
      var promises = [];

      rows.forEach(function(element) {
        promises.push(
          catModel.getCatByEditor(element.ID).then(rows => {
            list.push({
              editor: element,
              cat: rows
            });
          }).catch(next)
        );
      });
      Promise.all(promises).then(() => {
        res.render("admin/xem_editor", {
          layout: "main_admin.hbs",
          dsbientapvien: list
        });
      })
    })
    .catch(next);
});

router.get("/xem_danh_muc", auth, (req, res) => {
  category
    .all()
    .then(rows => {
      console.log(rows);
      var dsdanhmuc = [];
      rows.forEach(element => {
        dsdanhmuc.push({
          category: element,
          isParent: element.ChuyenMucCha === null ? true : false
        });
      });
      res.render("admin/xem_danh_muc", {
        layout: "main_admin.hbs",
        dsdanhmuc: dsdanhmuc
      });
    })
    .catch(err => {
      console.log(err);
    });
});

router.get("/xem_bai_viet", auth, (req, res) => {
  productModel
    .allProduct()
    .then(rows => {
      console.log(rows);
      var dsbaivietadmin = [];
      rows.forEach(element => {
        dsbaivietadmin.push({
          product: element,
          isApprove: element.DaDuyet != 2 ? true : false
        });
      });
      res.render("admin/xem_bai_viet", {
        layout: "main_admin.hbs",
        dsbaivietadmin: dsbaivietadmin
      });
    })
    .catch(err => {
      console.log(err);
    });
});

router.get("/them_danh_muc", auth, (req, res) => {
  catModel.getParentCat().then(rows => {
    res.render("admin/them_danh_muc", {
      layout: "main_admin.hbs",
      cat: rows
    });
  });
});
router.post("/them_danh_muc", auth, (req, res, next) => {
  var title = req.body.title.trim();
  var cat = req.body.cat;
  catModel
    .singleCatName(title)
    .then(rows => {
      if (rows.length > 0) {
        catModel.getParentCat().then(rows => {
          res.render("admin/them_danh_muc", {
            layout: "main_admin.hbs",
            cat: rows,
            isDup: true
          });
        });
      } else {
        var catEntity = {
          TenChuyenMuc: title,
          ChuyenMucCha: cat === "0" ? null : cat
        };
        catModel.add(catEntity).then(id => {
          res.redirect("/admin/them_danh_muc");
        });
      }
    })
    .catch(next);
});

// router.post("/them_danh_muc", (req, res, next) => {
//   var title = req.body.title.trim();
//   var cat = req.body.cat;
//   catModel
//     .singleCatName(title)
//     .then(rows => {
//       if (rows.length > 0) {
//         catModel.getParentCat().then(rows => {
//           res.render("admin/them_danh_muc", {
//             layout: "main_admin.hbs",
//             cat: rows,
//             isDup: true
//           });
//         });
//       } else {
//         var catEntity = {
//           TenChuyenMuc: title,
//           ChuyenMucCha: cat === "0" ? null : cat
//         };
//         catModel.add(catEntity).then(id => {
//           res.redirect("/admin/them_danh_muc");
//         });
//       }
//     })
//     .catch(next);
// });

// router.get('/xem_bai_viet', (req, res) => {
//   productModel.allProduct().then(rows => {
//       console.log(rows);
//       var dsbaivietadmin = [];
//       rows.forEach(element => {
//           dsbaivietadmin.push({
//               product: element,
//               isApprove: element.DaDuyet === 1 ? true : false,
//           })
//       })
//       res.render('admin/xem_bai_viet', {
//           layout: 'main_admin.hbs',
//           dsbaivietadmin: dsbaivietadmin
//       })
//   }).catch(err => {
//       console.log(err);
//   })
// })

router.get("/xuat_ban/:id", auth, (req, res) => {
  var id = req.params.id;
  productModel
    .allProductUpdate(id)
    .then(rows => {
      res.redirect("../xem_bai_viet");
    })
    .catch(err => {
      console.log(err);
    });
});

router.get("/sua_danh_muc/:id", auth, (req, res, next) => {
  var id = req.params.id;
  Promise.all([catModel.getParentCat(), catModel.singleForCate(id)])
    .then(([listCat, rows]) => {
      var listTemp = [];
      listCat.forEach(element => {
        listTemp.push({
          singleCat: element,
          isParent: rows[0].ChuyenMucCha === element.IDChuyenMuc ? true : false
        });
      });
      res.render("admin/sua_danh_muc", {
        layout: "main_admin.hbs",
        cat: rows[0],
        listCat: listTemp
      });
    })
    .catch(next);
});

router.post("/sua_danh_muc/:id", auth, (req, res, next) => {
  var id = req.params.id;
  console.log(req.body.cat);
  var entity = {
    IDChuyenMuc: id,
    ChuyenMucCha: req.body.cat === "0" ? null : req.body.cat
  };
  catModel.update(entity).then(() => {
    res.redirect("/admin/manager/sua_danh_muc/" + id);
  });
});

router.get("/xem_nhan", auth, (req, res, next) => {
  tagModel
    .all()
    .then(rows => {
      res.render("admin/xem_nhan", {
        layout: "main_admin.hbs",
        tag: rows
      });
    })
    .catch(next);
});

router.get("/them_nhan", auth, (req, res, next) => {
  tagModel
    .all()
    .then(rows => {
      res.render("admin/them_nhan", {
        layout: "main_admin.hbs",
        tag: rows
      });
    })
    .catch(next);
});

router.post("/them_nhan", auth, (req, res, next) => {
  var entity = {
    TenTag: req.body.title
  };
  tagModel
    .add(entity)
    .then(rows => {
      res.redirect("/admin/manager/xem_nhan");
    })
    .catch(next);
});

router.get("/chi_dinh/:id", auth, (req, res, next) => {
  var id = req.params.id;
  Promise.all([userModel.single(id), catModel.getNotManageCat(id)]).then(
    ([rows, rows2]) => {
      res.render("admin/chi_dinh", {
        layout: "main_admin.hbs",
        btv: rows[0],
        cat: rows2
      });
    }
  );
});

router.post("/chi_dinh/:id", auth, (req, res, next) => {
  var id = req.params.id;
  var entity = {
    BienTapVien: id,
    IDChuyenMuc: req.body.cat
  };
  btvCatModel.add(entity).then(rows => {
    res.redirect("/admin/manager/xem_editor");
  });
});

router.get("/delete/:id", auth, (req, res, next) => {
  var id = req.params.id;
  var entity = {
    IDBaiViet: id,
    DaDuyet: 5
  };
  productModel.update(entity).then(rows => {
    res.redirect("/admin/manager/xem_bai_viet");
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
    img[0].urllinkHinh = img[0].urllinkHinh.replace(/\\/g, "/");
    var listTemp = []
      cat.forEach(element => {
        listTemp.push({
          singleCat: element,
          thisCat: rows[0].ChuyenMuc === element.IDChuyenMuc ? true : false
        })
      })
    res.render("admin/hieu_chinh", {
      layout: "main_admin.hbs",
      product: rows[0],
      isVip: rows[0].TinhTrangBV === 1 ? true : false,
      cat: listTemp,
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
    DaDuyet: 4,
    TinhTrangBV: premium
  };
  Promise.all([productModel.update(entityProduct)]).then(([product]) => {
    res.redirect("/admin/manager/xem_bai_viet");
  }).catch(next);
});

module.exports = router;
