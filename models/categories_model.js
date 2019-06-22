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

    singleCatName:name=>{
        return db.load(`select * from ChuyenMuc where TenChuyenMuc='${name}'`);
    },

    add: entity =>{
        return db.add('ChuyenMuc',entity);
    },

    update: entity=>{
        return db.update('ChuyenMuc','IDChuyenMuc',entity);
    },

    getChildrenByID: id=>{
        return db.load(`select * from ChuyenMuc where ChuyenMucCha='${id}' `)
    },

    getParentCat: ()=>{
        return db.load(`select * from ChuyenMuc where ChuyenMucCha is null `)
    },
    allCount:()=>{
        return db.load(`select count(*) as Total from ChuyenMuc `);
    },
    
  singleForCate: id => {
    return db.load(
      `select * from ChuyenMuc cm  where cm.IDChuyenMuc= '${id}'`
    );
  },

  getCatByEditor: id =>{
    return db.load(
        `select * from ChuyenMuc cm
        join bientapvien_chuyenmuc btv_cm on cm.IDChuyenMuc=btv_cm.IDChuyenMuc
          where btv_cm.BienTapVien= '${id}'`
      );
  },

  getNotManageCat: id =>{
    return db.load(
        `select * from ChuyenMuc cm
        join bientapvien_chuyenmuc btv_cm on cm.IDChuyenMuc=btv_cm.IDChuyenMuc
          where btv_cm.BienTapVien != '${id}'`
      );
  }
}