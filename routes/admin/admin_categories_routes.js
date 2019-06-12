var express = require('express');
var router = express.Router();
var adminLogin =require('./admin_account_routers');
//require('../../middlewares/view-engine')(router);

router.use('/admin_login',adminLogin)
router.get('/',(req,res)=>{
    res.render('admin/admin',{
        layout:'main_admin.hbs'
    });
})
router.get('/trang_chu',(req,res)=>{
    res.render('admin/admin',{
        layout:'main_admin.hbs'
    });
})
router.get('them_danh_muc',(req,res)=> {
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
module.exports = router;