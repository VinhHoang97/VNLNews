var express = require('express');
var router = express.Router();

router.get('/register',(req,res,next)=>{
    res.render('dang_ki');
})

router.post('/register',(req,res,next)=>{
})
module.exports = router;
