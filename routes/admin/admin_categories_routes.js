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

router.get('/phong_vien', (req, res) => {
    productModel.writer(7).then(rows => {
        res.render('admin/phong_vien', {
            layout: 'main_phong_vien.hbs',
            Tong: rows[0].Tong
        })
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
router.get('/xem_danh_sach_bai_viet', (req, res) => {
    productModel.allProductOfWriter(7).then(rows => {
        res.render('admin/xem_danh_sach_bai_viet', {
            layout: 'main_phong_vien.hbs',
            dsbaiviet: rows
        })
    }).catch(err => {
        console.log(err);
    })
})

router.get('/hieu_chinh_bai_viet', (req, res) => {
    productModel.updateProductOfWriter(7).then(rows => {
        console.log(rows);

        res.render('admin/hieu_chinh_bai_viet', {
            layout: 'main_phong_vien.hbs',
            dshieuchinh: rows
        })
    }).catch(err => {
        console.log(err);
    })
})


router.get('/hieu_chinh/:id', (req, res) => {
    var id = req.params.id;
    Promise.all([productModel.updateProductOfWriter(7), catModel.allChildren(), tagModel.singelByBaiViet(id)]).then(([rows, cat, tag]) => {
        var strTag = "";
        tag.forEach((element, index, array) => {
            if (index === array.length - 1)
                strTag += element.TenTag;
            else {
                strTag += element.TenTag + ',';
            }
        })
        console.log(rows[0]);
        res.render('admin/hieu_chinh', {
            layout: 'main_phong_vien.hbs',
            product: rows[0],
            isVip: rows[0].TinhTrangBV === 1 ? true : false,
            cat: cat,
            tag: strTag,
        })
    })
})

router.post('/upload', upload.single('fuMain'), (req, res, next) => {
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
            NgayDang: moment().format('YYYY-MM-DD HH:mm:ss'),
            NoiDung: FullDes,
            TomTat: summary,
            PhongVien: 8,
            BienTapVien: 3,
            DaDuyet: 4,
            TinhTrangBV: premium
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
        console.log(cat, title, FullDes, summary, tag, premium)
    }
})

router.post('/hieu_chinh/:id', (req, res) => {
    var cat = req.body.cat;
    var title = req.body.title;
    var FullDes = req.body.FullDes;
    var summary = req.body.summary;
    var tag = req.body.tag;
    var premium = req.body.premium;
    if (!req.file) {
        next
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
            DaDuyet: 4,
            TinhTrangBV: premium
        }

        var entityHinh = {
            urllinkHinh: req.file.path.substring(7)
        }
        var TagArr = tag.split(",");
        Promise.all([productModel.update(entityProduct), imgModel.update(entityHinh)]).then(([product, img]) => {
            var bar = new Promise((resolve, reject) => {
                TagArr.forEach((element, index, array) => {
                    var tagEntity = {
                        TenTag: element
                    };
                    tagModel.update(tagEntity).then(rows => {
                        var entity = {
                            IDBaiViet: product,
                            IDTag: rows
                        }
                        tagProModel.update(entity)
                    }
                    );
                    if (index === array.length - 1) resolve();
                });
            })
            var imgProEntity = {
                IDBaiViet: product,
                IDHinh: img
            }
            Promise.all([bar, imgProModel.update(imgProEntity)]).then(([result, id]) => {
                console.log(id);
            }).then(() => { res.redirect('./hieu_chinh_bai_viet'); }
            ).catch(next);
            console.log(product, img);
        }).catch(next);

        console.log(req.file.path.substring(7));
        // var link = req.file.path;
        console.log(cat, title, FullDes, summary, tag, premium)
    }

})
router.get('/upload', (req, res, next) => {
    catModel.allChildren().then(rows => {
        res.render('admin/upload', {
            layout: 'main_phong_vien.hbs',
            cat: rows
        });
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

router.get('/bien_tap_vien', (req, res) => {
    Promise.all([productModel.countAllEditor(4), productModel.countEditor(4)]).then(([rows, rows1]) => {
        res.render('admin/bien_tap_vien', {
            layout: 'main_bien_tap_vien.hbs',
            dsdaduyet: rows[0].Tong1,
            dschuaduyet: rows1[0].Tong2,
        })
    })
})

router.get('/tu_choi/:id', (req, res) => {
    var id = req.params.id
    productModel.updateDenied(id).then(rows => {
        res.redirect('../duyet_bai_viet')
    }).catch(err => {
        console.log(err);
    })
})

router.get('/da_duyet/:id', (req, res) => {
    var id = req.params.id
    productModel.updateApprove(id).then(rows => {
        res.redirect('../duyet_bai_viet')
    }).catch(err => {
        console.log(err);
    })
})

router.get('/duyet/:id', (req, res) => {
    var id = req.params.id;
    Promise.all([productModel.singleForEditor(id), catModel.allChildren(), tagModel.singelByBaiViet(id), imgModel.getImgByProduct(id)]).then(([rows, cat, tag, img]) => {
        var strTag = "";
        tag.forEach((element, index, array) => {
            if (index === array.length - 1)
                strTag += element.TenTag;
            else {
                strTag += element.TenTag + ',';
            }
        })
        console.log(rows[0]);
        console.log(img);
        res.render('admin/duyet', {
            layout: 'main_bien_tap_vien.hbs',
            product: rows[0],
            isVip: rows[0].TinhTrangBV === 1 ? true : false,
            cat: cat,
            tag: strTag,
            img: img[0]
        });
    })
})

router.get('/duyet_bai_viet', (req, res) => {
    productModel.updateEditor(4).then(rows => {
        res.render('admin/duyet_bai_viet', {
            layout: 'main_bien_tap_vien.hbs',
            dsbaiduyet: rows
        })
    }).catch(err => {
        console.log(err);
    })
})

router.get('/bai_viet_da_duyet', (req, res) => {
    productModel.allEditor(4).then(rows => {
        res.render('admin/bai_viet_da_duyet', {
            layout: 'main_bien_tap_vien.hbs',
            dsbaidaduyet: rows
        })
    }).catch(err => {
        console.log(err);
    })
})

module.exports = router;