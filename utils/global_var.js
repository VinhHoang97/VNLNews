var category = require('../models/categories_model.js');
module.exports = (req, res,next) => {
    res.locals.categoryFull = [];
    category.all().then(rows => {
        rows.forEach(element => {
            if (element.ChuyenMucCha == null) {
                category.getChildrenByID(element.IDChuyenMuc).then(rows => {
                    if (rows != []) {
                        res.locals.categoryFull.push({
                            parentCategory: element,
                            childCategory: rows
                        })
                    }
                }).catch(err => {
                    console.log(err);
                });
            }
        });
        next();
    })

}