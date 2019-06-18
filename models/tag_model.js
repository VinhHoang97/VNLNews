var db = require('../utils/db');

module.exports={
    all:()=>{
        return db.load(`select * from Nhan order by IDTag asc`);
    },

    single:id=>{
        return db.load(`select * from Nhan where IDTag='${id}'`);
    },


    add: entity =>{
        return db.add('Nhan',entity);
    },

    update: entity=>{
        return db.update('Nhan','IDTag',entity);
    },

    singelByBaiViet: id=>{
        return db.load(`select * from Nhan nh join Nhan_BaiViet nbv on nh.IDTag = nbv.IDTag where nbv.IDBaiViet=${id} `)
    },

    countByBaiViet: id=>{
        return db.load(`select count(*) as total from binhluan where BaiViet='${id}' `)
    }

}