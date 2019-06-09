var express = require('express');
var router = express.Router();
router.get('/',(req,res)=>{
    res.render('admin/admin',{
        layout:'main_admin.hbs'
    });
})

router.use('/trang_chu',(req,res)=>{
    res.render('admin/admin',{
        layout:'main_admin.hbs'
    });
})
router.use('/them_danh_muc',(req,res)=> {
    res.render('admin/them_danh_muc',{
        layout:'main_admin.hbs'
    })
})
router.use('/xem_danh_muc',(req,res)=> {
    res.render('admin/xem_danh_muc',{
        layout:'main_admin.hbs'
    })
})

router.use('/xem_phong_vien',(req,res)=> {
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
module.exports = router;