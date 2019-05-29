var db = require('../utils/db');

module.exports={
    all:()=>{
        
        return db.load(`select * from BaiViet`);
    },

    singleByCategory:id=>{
        return db.load(`select * from BaiViet where IDChuyenMuc=${id}`);
    },


    add: entity =>{
        return db.add('chuyenmuc',entity);
    }
}