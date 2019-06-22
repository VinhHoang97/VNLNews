var db = require('../utils/db');

module.exports = {
    update: entity => {
        return db.update("bientapvien_chuyenmuc", "BienTapVien",entity);
    },

    add:entity=>{
        return db.add("bientapvien_chuyenmuc",entity);
    }
}