var express = require('express');
var router = express.Router();
var adminLogin =require('./admin_account_routers');
var auth = require('../../middlewares/auth');
//require('../../middlewares/view-engine')(router);

router.use('/admin_login',adminLogin)
router.get('/',(req,res)=>{
    res.render('admin/admin',{
        layout:'main_admin.hbs'
    });
})
router.post('/logout', auth, (req, res, next) => {
    req.logOut();
    res.redirect('/admin/admin_login');
  })
router.get('/trang_chu',(req,res)=>{
    res.render('admin/admin',{
        layout:'main_admin.hbs'
    });
})
router.get('/them_danh_muc',(req,res)=> {
    res.render('admin/them_danh_muc',{
        layout:'main_admin.hbs'
    })
})
router.get('/xem_danh_muc',(req,res)=> {
    res.render('admin/xem_danh_muc',{
        layout:'main_admin.hbs'
    })
})

router.get('/xem_phong_vien',(req,res)=> {
    res.render('admin/xem_phong_vien',{
        layout:'main_admin.hbs'
    })
})
router.use('/xem_bai_viet',(req,res)=> {
    res.render('admin/xem_bai_viet',{
        layout:'main_admin.hbs'
    })
})

router.use('/xem_thanh_vien',(req,res)=> {
    res.render('admin/xem_thanh_vien',{
        layout:'main_admin.hbs'
    })
})

router.use('/xem_editor',(req,res)=> {
    res.render('admin/xem_editor',{
        layout:'main_admin.hbs'
    })
})

router.use('/phong_vien',(req,res)=> {
    res.render('admin/phong_vien',{
        layout:'main_phong_vien.hbs'
    })
})

router.use('/xem_danh_sach_bai_viet',(req,res)=> {
    res.render('admin/xem_danh_sach_bai_viet',{
        layout:'main_phong_vien.hbs'
    })
})

router.use('/hieu_chinh_bai_viet',(req,res)=> {
    res.render('admin/hieu_chinh_bai_viet',{
        layout:'main_phong_vien.hbs'
    })
})

router.get('/upload', (req, res, next) => {
    res.render('admin/upload',{
        layout:'main_phong_vien.hbs'
    })
  })
module.exports = router;