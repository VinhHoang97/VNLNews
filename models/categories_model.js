var db = require('../utils/db');

module.exports={
    all:()=>{
        
        return db.load(`select * from chuyenmuc`);
    },

    single:id=>{
        return db.load(`select * from chuyenmuc where IDChuyenMuc='${id}'`);
    },


    add: entity =>{
        return db.add('chuyenmuc',entity);
    },

    update: entity=>{
        return db.update('chuyenmuc','IDChuyenMuc',entity);
    },

    getChildrenByID: id=>{
        return db.load(`select * from chuyenmuc where ChuyenMucCha='${id}'`)
    }

    
}