var express = require("express");
var productModel = require("../models/product_model");
var categoryModel = require("../models/categories_model");
var imageModel = require("../models/image_model");
var router = express.Router();


router.get('/',(req,res)=>{
    var carousel=[];
    productModel.getMostView(4).then(rows => {
        console.log(rows);
        var bar = new Promise((resolve,reject)=>{
            rows.forEach((element,index,array) => {
                Promise.all([imageModel.getImgByProduct(element.IDBaiViet),categoryModel.single(element.ChuyenMuc)])
                .then(([img,cat])=>{
                    carousel.push({
                        product:element,
                        img: img[0],
                        cat: cat[0]
                    });
                    console.log(img);
                });
                if (index === array.length - 1) resolve();
            });
        }).then(()=>{
            var top10=[]
            productModel.getMostView(10).then(rows => {
                console.log(rows);
                var bar = new Promise((resolve,reject)=>{
                    rows.forEach((element,index,array) => {
                        Promise.all([imageModel.getImgByProduct(element.IDBaiViet),categoryModel.single(element.ChuyenMuc)])
                        .then(([img,cat])=>{
                            top10.push({
                                product:element,
                                img: img[0],
                                cat: cat[0]
                            });
                            console.log(img);
                        });
                        if (index === array.length - 1) resolve();
                    });
                }).then(()=>{
                    res.render('index',{carousel:carousel,top10:top10});
                });
            });
        });
    });
});



module.exports = router;