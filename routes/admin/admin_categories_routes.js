var express = require('express');
var router = express.Router();
var adminLogin = require('./admin_account_routers');
var productModel = require('../../models/product_model');
var catModel = require("../../models/categories_model");
var tagModel = require("../../models/tag_model");
var tagProModel = require("../../models/tag_product_model");
var imgProModel = require("../../models/img_product_model");
var moment = require('moment');
var imgModel = require('../../models/image_model');
var auth = require('../../middlewares/auth');

var multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/img/product_img');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
})

var upload = multer({ storage });


//require('../../middlewares/view-engine')(router);

router.use('/admin_login', adminLogin)
router.get('/', (req, res) => {
    res.render('admin/admin', {
        layout: 'main_admin.hbs'
    });
})
router.post('/logout', auth, (req, res, next) => {
    req.logOut();
    res.redirect('/admin/admin_login');
})
router.get('/trang_chu', (req, res) => {
    res.render('admin/admin', {
        layout: 'main_admin.hbs'
    });
})
router.get('/them_danh_muc', (req, res) => {
    res.render('admin/them_danh_muc', {
        layout: 'main_admin.hbs'
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
router.use('/xem_bai_viet', (req, res) => {
    res.render('admin/xem_bai_viet', {
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

router.use('/phong_vien', (req, res) => {
    res.render('admin/phong_vien', {
        layout: 'main_phong_vien.hbs'
    })
})

router.use('/xem_danh_sach_bai_viet', (req, res) => {
    res.render('admin/xem_danh_sach_bai_viet', {
        layout: 'main_phong_vien.hbs'
    })
})

router.use('/hieu_chinh_bai_viet', (req, res) => {
    res.render('admin/hieu_chinh_bai_viet', {
        layout: 'main_phong_vien.hbs'
    })
})

router.use('/hieu_chinh', (req, res) => {
    res.render('admin/hieu_chinh', {
        layout: 'main_phong_vien.hbs'
    })
})

router.get('/upload', (req, res, next) => {
    catModel.allChildren().then(rows => {
        res.render('admin/upload', {
            layout: 'main_phong_vien.hbs',
            cat: rows
        });
    })
})


router.post('/upload', upload.single('fuMain'), (req, res, next) => {
    var cat = req.body.cat;
    var title = req.body.title;
    var FullDes = req.body.FullDes;
    var summary = req.body.summary;
    var tag = req.body.tag;
    if (!req.file) {
        res.json({
            // console.log(req.file);
        });
    } else {
        var entityProduct = {
            TieuDe: title,
            TieuDe_KhongDau: "",
            ChuyenMuc: cat,
            NgayDang: moment().format('YYYY-MM-DD HH:mm:ss'),
            NoiDung: FullDes,
            TomTat: summary,
            PhongVien: 8,
            BienTapVien: 3,
            DaDuyet: 4
        }

        var entityHinh = {
            urllinkHinh: req.file.path.substring(7)
        }
        var TagArr = tag.split(",");
        Promise.all([productModel.add(entityProduct), imgModel.add(entityHinh)]).then(([product, img]) => {
            var bar = new Promise((resolve, reject) => {
                TagArr.forEach((element, index, array) => {
                    var tagEntity = {
                        TenTag: element
                    };
                    tagModel.add(tagEntity).then(rows => {
                        var entity = {
                            IDBaiViet: product,
                            IDTag: rows
                        }
                        tagProModel.add(entity)
                    }
                    );
                    if (index === array.length - 1) resolve();
                });
            })
            var imgProEntity = {
                IDBaiViet: product,
                IDHinh: img
            }
            Promise.all([bar, imgProModel.add(imgProEntity)]).then(([result, id]) => {
                console.log(id);
            }).then(() => { res.redirect('/admin/upload'); }
            ).catch(next);
            console.log(product, img);
        }).catch(next);

        console.log(req.file.path.substring(7));
        // var link = req.file.path;
        console.log(cat, title, FullDes, summary, tag)
    }


})

router.use('/bien_tap_vien', (req, res) => {
    res.render('admin/bien_tap_vien', {
        layout: 'main_bien_tap_vien.hbs'
    })
})

router.use('/duyet_bai_viet', (req, res) => {
    res.render('admin/duyet_bai_viet', {
        layout: 'main_bien_tap_vien.hbs'
    })
})

router.use('/bai_viet_da_duyet', (req, res) => {
    res.render('admin/bai_viet_da_duyet', {
        layout: 'main_bien_tap_vien.hbs'
    })
})

module.exports = router;