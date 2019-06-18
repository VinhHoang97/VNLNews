var db = require('../utils/db');

module.exports = {
    add: entity => {
        return db.add("Nhan_BaiViet", entity);
    },

    update: entity => {
        return db.update('Nhan_BaiViet', 'ID', entity);
      },
}