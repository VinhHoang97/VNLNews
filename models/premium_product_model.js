var db = require("../utils/db");

module.exports = {
  pageByCategory: (id, limit, offset) => {
    return db.load(
      `select * from BaiViet where ChuyenMuc='${id}' and DaDuyet=2 order by TinhTrangBV desc limit ${limit} offset ${offset} `
    );
  },
  countByCategory: id => {
    return db.load(
      `select count(*) as total from BaiViet where ChuyenMuc='${id}' and DaDuyet=2 order by TinhTrangBV desc`
    );
  },

  pageByTag: (id, limit, offset) => {
    return db.load(
      `select * from BaiViet bv 
          join Nhan_BaiViet nbv on bv.IDBaiViet = nbv.IDBaiViet 
          where nbv.IDTag=${id} and bv.DaDuyet= 2 
          order by TinhTrangBV desc
          limit ${limit} offset ${offset} `
    );
  },

  countByTag: id => {
    return db.load(
      `select count(*) as total from BaiViet bv 
          join Nhan_BaiViet nbv on bv.IDBaiViet = nbv.IDBaiViet 
          where nbv.IDTag=${id} and bv.DaDuyet= 2 order by TinhTrangBV desc`
    );
  },

  pageByParentCategory: (id, limit, offset) => {
    return db.load(
      `select * from BaiViet bv
          join ChuyenMuc cm on bv.ChuyenMuc= cm.IDChuyenMuc
          where cm.ChuyenMucCha='${id}' and bv.DaDuyet= 2
          order by TinhTrangBV desc
          limit ${limit} offset ${offset} `
    );
  },

  countByParentCategory: id => {
    return db.load(
      `select count(*) as total from BaiViet bv
          join ChuyenMuc cm on bv.ChuyenMuc= cm.IDChuyenMuc where cm.ChuyenMucCha='${id}' and bv.DaDuyet= 2 order by TinhTrangBV desc`
    )
  },

  getMostView: amount => {
    return db.load(`select  *
            from BaiViet bv
            where bv.DaDuyet= 2 
            order by LuotXem desc
            LIMIT ${amount};`);
  },

  getNewest: amount => {
    return db.load(`select * from BaiViet bv
        where bv.DaDuyet= 2 
        order by bv.NgayDang desc
        limit ${amount};`);
  },

  getNewestByCat: (idCat, amount) => {
    return db.load(`select * from BaiViet bv
        where bv.ChuyenMuc =${idCat} and bv.DaDuyet= 2
        order by bv.NgayDang desc
        limit ${amount};`);
  },

  seachProductFullText: string => {
    return db.load(
      `SELECT * FROM  BaiViet
      WHERE MATCH(TieuDe, TomTat,NoiDung) 
      AGAINST ('${string}' IN NATURAL LANGUAGE MODE) and DaDuyet = 2 order by TinhTrangBV desc  limit 7; `
    );
  },
};
