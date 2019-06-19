var db = require("../utils/db");

module.exports = {
  all: () => {
    return db.load(`select * from BaiViet where  DaDuyet= 2`);
  },

  singleByCategory: id => {
    return db.load(
      `select * from BaiViet where ChuyenMuc='${id}' and DaDuyet= 2`
    );
  },

  singleByParentCat: id => {
    return db.load(`select * 
        from BaiViet bv
        join ChuyenMuc cm on bv.ChuyenMuc= cm.IDChuyenMuc
        where cm.ChuyenMucCha='${id}' and bv.DaDuyet= 2`);
  },

  pageByCategory: (id, limit, offset) => {
    return db.load(
      `select * from BaiViet where ChuyenMuc='${id}' and DaDuyet!=4 limit ${limit} offset ${offset}`
    );
  },

  
  add: entity => {
    return db.add("BaiViet", entity);
  },

  update: entity => {
    return db.update("baiviet", "IDBaiViet", entity);
  },

  delete: id => {
    return db.delete("baiviet", "IDBaiViet", id);
  },

  countByCategory: id => {
    return db.load(
      `select count(*) as total from BaiViet where ChuyenMuc='${id}' and DaDuyet=2`
    );
  },

  pageByTag: (id, limit, offset) => {
    return db.load(
      `select * from BaiViet bv 
      join Nhan_BaiViet nbv on bv.IDBaiViet = nbv.IDBaiViet 
      where nbv.IDTag=${id} and bv.DaDuyet= 2
      limit ${limit} offset ${offset}`
    );
  },

  countByTag: id => {
    return db.load(
      `select count(*) as total from BaiViet bv 
      join Nhan_BaiViet nbv on bv.IDBaiViet = nbv.IDBaiViet 
      where nbv.IDTag=${id} and bv.DaDuyet= 2`
    );
  },

  pageByParentCategory: (id, limit, offset) => {
    return db.load(
      `select * from BaiViet bv
      join ChuyenMuc cm on bv.ChuyenMuc= cm.IDChuyenMuc
      where cm.ChuyenMucCha='${id}' and bv.DaDuyet= 2
      limit ${limit} offset ${offset}`
    );
  },

  countByParentCategory: id => {
    return db.load(
      `select count(*) as total from BaiViet bv
      join ChuyenMuc cm on bv.ChuyenMuc= cm.IDChuyenMuc
      where cm.ChuyenMucCha='${id}' and bv.DaDuyet= 2`
    );
  },

  getMostView: amount => {
    return db.load(`select  *
        from BaiViet bv
        where bv.DaDuyet= 2
        order by  LuotXem desc
        LIMIT ${amount};`);
  },

  getNewest: amount => {
    return db.load(`select * from BaiViet bv
    where bv.DaDuyet= 2
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
    where bv.ChuyenMuc =${idCat} and bv.DaDuyet= 2
    order by bv.NgayDang desc
    limit ${amount};`);
  },


  single: id => {
    return db.load(
      `select * from BaiViet bv join NguoiDung nd on bv.PhongVien = nd.ID where bv.IDBaiViet= '${id}' and bv.DaDuyet= 2`
    );
  },

  updatesingle:id=>{
    return db.load(
      `select * from BaiViet bv join NguoiDung nd on bv.PhongVien = nd.ID where bv.IDBaiViet= '${id}'`
    );
  },

  singleForEditor: id => {
    return db.load(
      `select * from BaiViet bv join NguoiDung nd on bv.PhongVien = nd.ID where bv.IDBaiViet= '${id}' and bv.DaDuyet= 4`
    );
  },
writer: id=>{
  return db.load(
    `select count(*) as Tong from BaiViet bv join NguoiDung nd on bv.PhongVien = nd.ID where nd.ID= ${id}`
  );
},

  allProductOfWriter: id =>{
    return db.load(
      `select cm.TenChuyenMuc,bv.TieuDe,nd1.HoTen,d.Loai from BaiViet bv join NguoiDung nd on bv.PhongVien = nd.ID
      join chuyenmuc cm on cm.IDChuyenMuc=bv.ChuyenMuc
                  join NguoiDung nd1 on bv.BienTapVien=nd1.ID
                  join duyet d on bv.DaDuyet=d.IDDuyet
                  where nd.ID=${id} order by bv.DaDuyet desc`
    );
  },

  updateProductOfWriter: id => {
    return db.load(
      `select cm.TenChuyenMuc,bv.*,nd1.HoTen,d.Loai  from BaiViet bv join NguoiDung nd on bv.PhongVien = nd.ID
      join chuyenmuc cm on cm.IDChuyenMuc=bv.ChuyenMuc
                  join NguoiDung nd1 on bv.BienTapVien=nd1.ID
                  join duyet d on bv.DaDuyet=d.IDDuyet
                  where nd.ID=${id} and (d.IDDuyet=3 or d.IDDuyet=4) order by bv.DaDuyet desc`
    );
  },
countEditor: id=>{
  return db.load(
    `select count(*) as Tong2 from BaiViet bv join NguoiDung nd on bv.BienTapVien = nd.ID where nd.ID= ${id} and bv.DaDuyet=4 `
  );
},

countAllEditor: id=>{
  return db.load(
    `select count(*) as Tong1 from BaiViet bv join NguoiDung nd on bv.BienTapVien = nd.ID where nd.ID= ${id} and  (bv.DaDuyet=1 or bv.DaDuyet=2 or bv.DaDuyet=3 ) `
  );
},

  updateEditor: id =>{
    return db.load(
    ` select cm.TenChuyenMuc,bv.*,nd1.HoTen,d.Loai from BaiViet bv join NguoiDung nd on bv.BienTapVien = nd.ID
    join chuyenmuc cm on cm.IDChuyenMuc=bv.ChuyenMuc
                join NguoiDung nd1 on bv.PhongVien=nd1.ID
                join duyet d on bv.DaDuyet=d.IDDuyet
                where nd.ID=${id} and d.IDDuyet=4`
    )
  },

  allEditor: id =>{
    return db.load(
    ` select cm.TenChuyenMuc,bv.*,nd1.HoTen,d.Loai  from BaiViet bv join NguoiDung nd on bv.BienTapVien = nd.ID
    join chuyenmuc cm on cm.IDChuyenMuc=bv.ChuyenMuc
                join NguoiDung nd1 on bv.PhongVien=nd1.ID
                join duyet d on bv.DaDuyet=d.IDDuyet
                where nd.ID=${id} and (d.IDDuyet=3 or d.IDDuyet=1 or d.IDDuyet=2)`
    )
  },

  seachProductFullText: string => {
    return db.load(
      `SELECT * FROM  BaiViet
      WHERE MATCH(TieuDe, TomTat,NoiDung) 
      AGAINST ('${string}' IN NATURAL LANGUAGE MODE) limit 5; `
    );
  },
  allProduct: () => {
    return db.load(
      `select bv.IDBaiViet,cm.TenChuyenMuc,bv.TieuDe, nd.HoTen as PhongVien, nd1.HoTen as BienTapVien, bv.DaDuyet, d.Loai  from BaiViet bv join NguoiDung nd on bv.PhongVien = nd.ID 
      join NguoiDung nd1 on  bv.BienTapVien=nd1.ID
      join chuyenmuc cm on cm.IDChuyenMuc=bv.ChuyenMuc
      join duyet d on bv.DaDuyet=d.IDDuyet`
    );
  },
  allProductUpdate: id => {
    return db.load(
      `update BaiViet
      set DaDuyet = 2
      where IDBaiViet=${id}`
    );
  },
  updateDenied: id => {
    return db.load(
      `update BaiViet
      set DaDuyet = 3
      where IDBaiViet=${id}`
    );
  },
  updateApprove: id => {
    return db.load(
      `update BaiViet
      set DaDuyet = 1
      where IDBaiViet=${id}`
    );
  }
};
