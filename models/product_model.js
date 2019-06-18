var db = require("../utils/db");

module.exports = {
  all: () => {
    return db.load(`select * from BaiViet`);
  },

  singleByCategory: id => {
    return db.load(`select * from BaiViet where ChuyenMuc='${id}'`);
  },

  singleByParentCat: id => {
    return db.load(`select * 
        from BaiViet bv
        join ChuyenMuc cm on bv.ChuyenMuc= cm.IDChuyenMuc
        where cm.ChuyenMucCha='${id}'`);
  },

  pageByCategory: (id, limit, offset) => {
    return db.load(
      `select * from BaiViet where ChuyenMuc='${id}' limit ${limit} offset ${offset}`
    );
  },

  update: entity => {
    return db.update('baiviet', 'IDBaiViet', entity);
  },

  delete: id => {
    return db.delete('baiviet', 'IDBaiViet', id);
  },




  countByCategory: id => {
    return db.load(
      `select count(*) as total from BaiViet where ChuyenMuc='${id}'`
    );
  },

  pageByTag: (id, limit, offset) => {
    return db.load(
      `select * from BaiViet bv 
      join Nhan_BaiViet nbv on bv.IDBaiViet = nbv.IDBaiViet 
      where nbv.IDTag=${id}
      limit ${limit} offset ${offset}`
    );
  },

  countByTag: id => {
    return db.load(
      `select count(*) as total from BaiViet bv 
      join Nhan_BaiViet nbv on bv.IDBaiViet = nbv.IDBaiViet 
      where nbv.IDTag=${id}`
    );
  },

  pageByParentCategory: (id, limit, offset) => {
    return db.load(
      `select * from BaiViet bv
      join ChuyenMuc cm on bv.ChuyenMuc= cm.IDChuyenMuc
      where cm.ChuyenMucCha='${id}'
      limit ${limit} offset ${offset}`
    );
  },

  countByParentCategory: id => {
    return db.load(
      `select count(*) as total from BaiViet bv
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

  getNewestByCat: (idCat, amount) => {
    return db.load(`select * from BaiViet bv
    where bv.ChuyenMuc =${idCat}
    order by bv.NgayDang desc
    limit ${amount};`);
  },

  add: entity => {
    return db.add("BaiViet", entity);
  },

  single: id => {
    return db.load(
      `select * from BaiViet bv join NguoiDung nd on bv.PhongVien = nd.ID where bv.IDBaiViet= '${id}'`
    );
  },

  allProductOfWriter: id =>{
    return db.load(
      `select cm.TenChuyenMuc,bv.TieuDe,nd1.HoTen,d.Loai  from BaiViet bv join NguoiDung nd on bv.PhongVien = nd.ID
      join chuyenmuc cm on cm.IDChuyenMuc=bv.ChuyenMuc
                  join NguoiDung nd1 on bv.BienTapVien=nd1.ID
                  join duyet d on bv.DaDuyet=d.IDDuyet
                  where nd.ID=${id}`
    );
  },

  updateProductOfWriter: id =>{
    return db.load(
      `select cm.TenChuyenMuc,bv.*,nd1.HoTen,d.Loai  from BaiViet bv join NguoiDung nd on bv.PhongVien = nd.ID
      join chuyenmuc cm on cm.IDChuyenMuc=bv.ChuyenMuc
                  join NguoiDung nd1 on bv.BienTapVien=nd1.ID
                  join duyet d on bv.DaDuyet=d.IDDuyet
                  where nd.ID=${id} and d.IDDuyet=3 or d.IDDuyet=4 `
    );
  }
};
