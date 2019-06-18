var db = require('../utils/db');

module.exports={
    all:()=>{
        return db.load(`select * from BinhLuan order by BaiViet asc`);
    },

    single:id=>{
        return db.load(`select * from BinhLuan where IDBinhLuan='${id}'`);
    },


    add: entity =>{
        return db.add('BinhLuan',entity);
    },

    update: entity=>{
        return db.update('BinhLuan','IDBinhLuan',entity);
    },

    singelByBaiViet: id=>{
        return db.load(`select * from BinhLuan bl join NguoiDung nd on bl.DocGia = nd.ID where BaiViet='${id}'`)
    },

    countByBaiViet: id=>{
        return db.load(`select count(*) as total from BinhLuan where BaiViet='${id}' `)
    }

}