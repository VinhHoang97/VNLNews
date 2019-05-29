var express = require('express ');
var categoriesModel=require('../routes/categories_routes');
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

module.exports = router;