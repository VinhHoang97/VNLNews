var express = require('express');
var categoriesModel=require('../models/categories_model');
var productModel = require('../models/product_model')
var router = express.Router();

router.get('/',(req,res)=>{
    var p =  categoriesModel.all();
    p.then(rows =>{
        console.log(rows);
        res.render('/')
    }).catch(err =>{
        console.log(err);
    });
})


router.get('/edit/:id',(req,res)=>{
    var id = req.params.id;
    categoriesModel.single(id).then(rows=>{
        if(rows.length>0){
            res.render('',{
                error:false,
                category:rows[0]
            });
        }else{
            res,render('',{
                error:true
            })
        }
    }).catch(err =>{
        console.log(err);
        res.end('error occured.')
    })
})

module.exports = router;