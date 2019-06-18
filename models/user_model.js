var db = require("../utils/db");

module.exports = {
  all: () => {
    return db.load(`select * from NguoiDung`);
  },
  single: id => {
    return db.load(`select * from NguoiDung where ID='${id}'`);
  },
  singleByUserName: username => {
    return db.load(`select * from NguoiDung where UserName='${username}'`);
  },
  singleByPassword: password => {
    return db.load(`select * from NguoiDung where Password='${password}'`);
  },
  singleByPhanHe: phanhe => {
    return db.load(`select * from NguoiDung where PhanHe='${phanhe}'`);
  },
  add:entity=>{
      return db.add("NguoiDung",entity);
  }
};

//
