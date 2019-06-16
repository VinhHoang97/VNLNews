var db = require('../utils/db');

module.exports={
    all:()=>{
        return db.load(`select * from binhluan order by BaiViet asc`);
    },

    single:id=>{
        return db.load(`select * from binhluan where IDBinhLuan='${id}'`);
    },


    add: entity =>{
        return db.add('binhluan',entity);
    },

    update: entity=>{
        return db.update('binhluan','IDBinhLuan',entity);
    },

    singelByBaiViet: id=>{
        return db.load(`select * from binhluan where BaiViet='${id}' `)
    },

    countByBaiViet: id=>{
        return db.load(`select count(*) as total from binhluan where BaiViet='${id}' `)
    }

}