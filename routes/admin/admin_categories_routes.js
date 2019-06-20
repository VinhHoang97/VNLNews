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
  destination: function(req, file, cb) {
    cb(null, "./public/img/product_img");
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});

var upload = multer({ storage });

//require('../../middlewares/view-engine')(router);

router.use("/admin_login", adminLogin);
router.get("/", (req, res) => {
  res.render("admin/admin", {
    layout: "main_admin.hbs"
  });
});

router.post("/logout", auth, (req, res, next) => {
  req.logOut();
  res.redirect("/admin/admin_login");
});

router.get("/trang_chu", (req, res) => {
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

router.get("/them_danh_muc", (req, res) => {
  catModel
    .getParentCat()
    .then(rows => {
      res.render("admin/them_danh_muc", {
        layout: "main_admin.hbs",
        cat: rows
      });
    })
    .catch(err => {
      console.log(err);
    });
});

router.get("/xem_phong_vien", (req, res) => {
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

router.get("/xem_thanh_vien", (req, res) => {
  userModel
    .allDG()
    .then(rows => {
      res.render("admin/xem_thanh_vien", {
        layout: "main_admin.hbs",
        dsdocgia: rows
      });
    })
    .catch(err => {
      console.log(err);
    });
});

router.get("/xem_editor", (req, res) => {
  userModel
    .allBTV()
    .then(rows => {
      res.render("admin/xem_editor", {
        layout: "main_admin.hbs",
        dsbientapvien: rows
      });
    })
    .catch(err => {
      console.log(err);
    });
});

router.get("/xem_danh_muc", (req, res) => {
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

router.get("/xem_bai_viet", (req, res) => {
  productModel
    .allProduct()
    .then(rows => {
      console.log(rows);
      var dsbaivietadmin = [];
      rows.forEach(element => {
        dsbaivietadmin.push({
          product: element,
          isApprove: element.DaDuyet === 1 ? true : false
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

router.get('/them_danh_muc', (req, res) => {
    catModel.getParentCat().then(rows => {
        res.render('admin/them_danh_muc', {
            layout: 'main_admin.hbs',
            cat: rows
        })
    })

})
router.get('/xem_danh_muc', (req, res) => {
    res.render('admin/xem_danh_muc', {
        layout: 'main_admin.hbs'
    })
})

router.get('/xem_phong_vien', (req, res) => {
    res.render('admin/xem_phong_vien', {
        layout: 'main_admin.hbs'
    })
})


router.use('/xem_thanh_vien', (req, res) => {
    res.render('admin/xem_thanh_vien', {
        layout: 'main_admin.hbs'
    })
})

router.use('/xem_editor', (req, res) => {
    res.render('admin/xem_editor', {
        layout: 'main_admin.hbs'
    })
})

router.get('/xem_bai_viet', (req, res) => {
  productModel.allProduct().then(rows => {
      console.log(rows);
      var dsbaivietadmin = [];
      rows.forEach(element => {
          dsbaivietadmin.push({
              product: element,
              isApprove: element.DaDuyet === 1 ? true : false,
          })
      })
      res.render('admin/xem_bai_viet', {
          layout: 'main_admin.hbs',
          dsbaivietadmin: dsbaivietadmin
      })
  }).catch(err => {
      console.log(err);
  })
})

router.get('/xuat_ban/:id', (req, res) => {
  var id = req.params.id
  productModel.allProductUpdate(id).then(rows => {
      res.redirect('../xem_bai_viet')
  }).catch(err => {
      console.log(err);
  })
})

router.post('/them_danh_muc', (req, res, next) => {
  var title = req.body.title.trim();
  var cat = req.body.cat;
  catModel.singleCatName(title).then(rows => {
      if (rows.length > 0) {
          catModel.getParentCat().then(rows => {
              res.render('admin/them_danh_muc', {
                  layout: 'main_admin.hbs',
                  cat: rows,
                  isDup: true
              })
          })
      }
      else {
          var catEntity = {
              TenChuyenMuc: title,
              ChuyenMucCha: cat === '0' ? null : cat
          }
          catModel.add(catEntity).then(id => {
              res.redirect('/admin/them_danh_muc');
          });
      }
  }).catch(next);
})

router.post("/them_danh_muc", (req, res, next) => {
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


/*---------------------------------------*/












router.get("/xuat_ban/:id", (req, res) => {
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




module.exports = router;
