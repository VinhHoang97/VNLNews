var express = require('express');
var categoriesModel=require('../models/categories_model');
var productModel = require('../models/product_model')
var router = express.Router();

router.post('/',(req,res)=>{
    console.log("Đã tới đây")
    res.render('search')
});

module.exports = router;