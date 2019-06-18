var express = require('express');
var bcrypt = require('bcrypt');
var router = express.Router();
var passport = require('passport');
var auth= require('../../middlewares/auth')
router.get('/',(req,res, next )=>{
    res.render('admin/admin_login',{
        layout:false
    });
})

router.post('/', (req, res, next) => {
    passport.authenticate('local', function (err, user , info) {
        if (err) { 
            return next(err); 
        }
        
        if (!user) { 
            return res.render('admin/admin_login', {
                layout: false, 
                err_message: info.message
            })
        }
        req.logIn(user, err=>{
            
            console.log(user);
            if(user.PhanHe==='PH001')
            {
            if (err) { return next(err); }
            return res.redirect('/admin/trang_chu');
            }
            if(user.PhanHe==='PH003')
            {
            if (err) { return next(err); }
            return res.redirect('/admin/phong_vien');
            } 
            if(user.PhanHe==='PH002')
            {
            if (err) { return next(err); }
            return res.redirect('/admin/phong_vien');
            } 
        });
    })(req, res, next);
});


router.get('/profile', auth , (req, res, next)=>{
    console.log("da toi day 4");
    res.end('admin');
})

module.exports = router;