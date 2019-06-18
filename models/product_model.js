var db = require('../utils/db');

module.exports={
    all:()=>{
        return db.load(`select * from baiviet`);
    },

    singleByCategory:id=>{
        return db.load(`select * from baiviet where ChuyenMuc='${id}'`);
    },

    singleByParentCat:id=>{
        return db.load(`select * 
        from baiviet bv
        join ChuyenMuc cm on bv.ChuyenMuc= cm.IDChuyenMuc
        where cm.ChuyenMucCha='${id}'`);
    },

    add: entity =>{
        return db.add('baiviet',entity);
    },

    update: entity => {
        return db.update('baiviet', 'IDBaiViet', entity);
      },
    
      delete: id => {
        return db.delete('baiviet', 'IDBaiViet', id);
      },

    single:id=>{
        return db.load(`select * from baiviet where IDBaiViet= '${id}'`);
    },
    
}