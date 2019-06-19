var db = require('../utils/db');

module.exports = {
    getImgByProduct: id => {
        return db.load(` select * 
        from urlHinhAnh ha join BaiViet_HinhAnh bv_ha on bv_ha.IDHinh=ha.IDHinh
        where  bv_ha.IDBaiViet='${id}'`)
    },
    add: entity => {
        return db.add("urlHinhAnh", entity);
    },

    update: entity => {
        return db.update("urlHinhAnh", entity);
      },
}