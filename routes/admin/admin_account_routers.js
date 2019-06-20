var express = require('express');
var bcrypt = require('bcrypt');
var router = express.Router();
var passport = require('passport');
var manager = require('./admin_categories_routes');
var auth= require('../../middlewares/auth');
var editorRoutes = require("./editor_routes");
var writerRoutes = require("./writer_routes");
router.get('/', (req,res, next )=>{
   
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
            return res.redirect('/admin/manager');
            }
            if(user.PhanHe==='PH003')
            {
            if (err) { return next(err); }
            return res.redirect('/admin/writer');
            } 
            if(user.PhanHe==='PH002')
            {
            if (err) { return next(err); }
            return res.redirect('/admin/editor');
            } 
        });
    })(req, res, next);
});
router.use('/manager',manager);
router.use('/editor',editorRoutes);
router.use('/writer',writerRoutes);
router.get('/profile', auth , (req, res, next)=>{
    console.log("da toi day 4");
    res.end('admin');
})

module.exports = router;