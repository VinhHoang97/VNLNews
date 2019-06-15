var express = require('express');
var bcrypt = require('bcrypt');
var router = express.Router();
var passport = require('passport');

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
            console.log("da toi day 3");
            if (err) { return next(err); }
            return res.redirect('/admin')
        });
    })(req, res, next);
});



module.exports = router;