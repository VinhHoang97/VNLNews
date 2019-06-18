var express = require('express');
var bcrypt = require('bcrypt');
var userModel = require('../models/user_model')
var moment = require('moment');
var router = express.Router();

router.get('/register',(req,res,next)=>{
    res.render('dang_ki');
});

router.post('/register',(req,res,next)=>{
    var saltRound=10;
    console.log(req.body);
    var hash = bcrypt.hashSync(req.body.password, saltRound);
    console.log((req.body.day.length===1?0+req.body.day:req.body.day)+"/"+(req.body.month.length===1?0+req.body.month:req.body.month)+"/"+req.body.year)
    var tmp =(req.body.day.length===1?0+req.body.day:req.body.day)+"/"+(req.body.month.length===1?0+req.body.month:req.body.month)+"/"+req.body.year;
    var dob = moment(tmp,"DD/MM/YYYY").format('YYYY-MM-DD');
    console.log(dob);
    var entity={
        UserName:req.body.username,
        Password:hash,
        HoTen:req.body.hoten,
        GioiTinh:req.body.gioitinh,
        Email:req.body.email,
        SDT:req.body.phoneNumber,
        PhanHe:'PH004',
        NgaySinh:dob,
        TinhTrang:'NOT VIP'
    };
    userModel.add(entity).then(id=>{
        res.redirect('/login');
    });
});
module.exports = router;