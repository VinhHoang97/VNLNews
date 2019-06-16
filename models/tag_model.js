var db = require('../utils/db');

module.exports={
    all:()=>{
        return db.load(`select * from nhan order by IDTag asc`);
    },

    single:id=>{
        return db.load(`select * from nhan where IDTag='${id}'`);
    },


    add: entity =>{
        return db.add('nhan',entity);
    },

    update: entity=>{
        return db.update('nhan','IDTag',entity);
    },

    singelByBaiViet: id=>{
        return db.load(`select * from nhan where BaiViet='${id}' `)
    },

    countByBaiViet: id=>{
        return db.load(`select count(*) as total from binhluan where BaiViet='${id}' `)
    }

}