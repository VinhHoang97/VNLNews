var express = require("express");
var productModel = require("../models/product_model");
var categoryModel = require("../models/categories_model");
var imageModel = require("../models/image_model");
var router = express.Router();


router.get('/',(req,res)=>{
    var carousel=[];
    var top10 = [];
    Promise.all([productModel.getMostView(4),productModel.getMostView(10)]).then(([carouselData,top10Data]) => {
        console.log(rows);
        new Promise((resolve,reject)=>{
            carouselData.forEach((element,index,array) => {
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
        });
        new Promise((resolve,reject)=>{
            top10Data.forEach((element,index,array) => {
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
        });
    });
});



module.exports = router;