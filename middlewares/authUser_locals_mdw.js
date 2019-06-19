var moment = require('moment');
module.exports = (req, res, next) => {
    if (req.user && req.user.PhanHe == 'PH004') {
        res.locals.isAuthenticatedAccount = true;
        res.locals.authAccount = req.user;
        res.locals.gender = req.user.GioiTinh == 'Nam'?true:false
        if(req.user.NgayHetHan < moment().format()){
            res.locals.isPremium = true;
        }else{
            res.locals.isPremium = false;
        }
    }
    next();
};