var category = require("../models/categories_model.js");
module.exports = (req, res, next) => {
  res.locals.categoryFull = [];
  category.all().then(rows => {
    var bar = new Promise((resolve, reject) => {
      rows.forEach((element, index, array) => {
        if (element.ChuyenMucCha == null) {
          category
            .getChildrenByID(element.IDChuyenMuc)
            .then(rows => {
              if (rows != []) {
                res.locals.categoryFull.push({
                  parentCategory: element,
                  childCategory: rows,
                  length:rows.length,
                  firstChild:rows[0],
                  leftChild:rows.filter((value,index,arr)=>{return index!=0})
                });
              }
            })
            .catch(err => {
              console.log(err);
            });
        }
        if (index === array.length - 1) resolve();
      });
    }).then(() => {
      next();
    });
  });
};
