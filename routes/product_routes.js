var express = require('express ');
var productModel=require('../routes/product_model');
var router = express.Router();

router.get('/',(req,res)=>{
    var p =  productModel.all();
    p.then(rows =>{
        console.log(rows);
        res.render('/')
    }).catch(err =>{
        console.log(err);
    });
})

module.exports = router;