var db = require('../utils/db');

module.exports={
    all:()=>{
        return db.load(`select * from ChuyenMuc order by IDChuyenMuc asc`);
    },

    allChildren:()=>{
        return db.load(`select * from ChuyenMuc where ChuyenMucCha != 'null' order by IDChuyenMuc asc `);
    },

    single:id=>{
        return db.load(`select * from ChuyenMuc where IDChuyenMuc='${id}'`);
    },


    add: entity =>{
        return db.add('ChuyenMuc',entity);
    },

    update: entity=>{
        return db.update('ChuyenMuc','IDChuyenMuc',entity);
    },

    getChildrenByID: id=>{
        return db.load(`select * from ChuyenMuc where ChuyenMucCha='${id}' `)
    }

}