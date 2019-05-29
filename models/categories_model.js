var db = require('../utils/db');

module.exports={
    all:()=>{
        console.log('có tới đây');
        return db.load(`select * from chuyenmuc`);
    },

    single:id=>{
        console.log('có tới đây');
        return db.load(`select * from chuyenmuc where IDChuyenMuc=${id}`);
    },


    add: entity =>{
        return db.add('chuyenmuc',entity);
    }
}