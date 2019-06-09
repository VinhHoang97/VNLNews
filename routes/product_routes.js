var express = require('express');
var productModel=require('../models/product_model');
var categoryModel = require('../models/categories_model');
var imageModel = require('../models/image_model');
var router = express.Router();

router.get('/productByCategory/:id',(req,res)=>{
    var id = req.params.id;
    var products = [];
     productModel.singleByCategory(id).then(rows =>{
         rows.forEach(element => {
            imageModel.getImgByProduct(element.IDBaiViet).then(result=>{
                products.push({
                    content:element,
                    img: result[0]
                });
               
            });
          
         });
         res.render('single_category',{products:products});
    }).catch(err =>{
        console.log(err);
    });
})

router.get('/productByParentCategory/:id',(req,res)=>{
    var id = req.params.id;
    var products = [];
    productModel.singleByParentCat(id).then(rows =>{
        rows.forEach(element => {
           imageModel.getImgByProduct(element.IDBaiViet).then(result=>{
               products.push({
                   content:element,
                   img: result[0]
               });
              
           });
         
        });
        res.render('single_category',{products:products});
    }).catch(err =>{
        console.log(err);
    });
})



router.get('/:id',(req,res)=>{
    var id = req.params.id;
    console.log(id);
     productModel.single(id).then(rows =>{
        categoryModel.single(rows[0].ChuyenMuc).then(category =>{
            console.log(rows);
            console.log(category);
            res.render('single_product',{product:rows[0],category:category[0]});
        })
    }).catch(err =>{
        console.log(err);
    });
})

module.exports = router;