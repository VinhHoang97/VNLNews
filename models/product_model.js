var db = require("../utils/db");

module.exports = {
  all: () => {
    return db.load(`select * from baiviet`);
  },

  singleByCategory: id => {
    return db.load(`select * from baiviet where ChuyenMuc='${id}'`);
  },

  singleByParentCat: id => {
    return db.load(`select * 
        from baiviet bv
        join ChuyenMuc cm on bv.ChuyenMuc= cm.IDChuyenMuc
        where cm.ChuyenMucCha='${id}'`);
  },

  pageByCategory: (id, limit, offset) => {
    return db.load(
      `select * from baiviet where ChuyenMuc='${id}' limit ${limit} offset ${offset}`
    );
  },

  countByCategory: id => {
    return db.load(
      `select count(*) as total from baiviet where ChuyenMuc='${id}'`
    );
  },

  pageByParentCategory: (id, limit, offset) => {
    return db.load(
      `select * from baiviet bv
      join ChuyenMuc cm on bv.ChuyenMuc= cm.IDChuyenMuc
      where cm.ChuyenMucCha='${id}'
      limit ${limit} offset ${offset}`
    );
  },

  countByParentCategory: id => {
    return db.load(
      `select count(*) as total from baiviet bv
      join ChuyenMuc cm on bv.ChuyenMuc= cm.IDChuyenMuc
      where cm.ChuyenMucCha='${id}'`
    );
  },

  getMostView: amount => {
    return db.load(`select  *
        from BaiViet 
        order by  LuotXem desc
        LIMIT ${amount};`);
  },

  getNewest: amount => {
    return db.load(`select * from BaiViet bv
    order by bv.NgayDang desc
    limit ${amount};`);
  },

  // getTrending: amount => {
  //   return db.load(`select * from BaiViet bv
  //   order by bv.NgayDang and bv.LuotXem desc
  //   limit ${amount} ;`);
  // },


  add: entity => {
    return db.add("baiviet", entity);
  },

  single: id => {
    return db.load(`select * from baiviet where IDBaiViet= '${id}'`);
  }
};
