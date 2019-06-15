var db = require('../utils/db');

module.exports={
    all:()=>{  
        return db.load(`select * from nguoidung`);
},
single:id=>{
    return db.load(`select * from nguoidung where ID='${id}'`);
},
singleByUserName:username=>{
    return db.load(`select * from nguoidung where UserName='${username}'`);
},
singleByPassword : password=>{
    return db.load(`select * from nguoidung where Password='${password}'`);
}, 
singleByPhanHe: phanhe=>{
    return db.load(`select * from nguoidung where PhanHe='${phanhe}'`);
}}
//