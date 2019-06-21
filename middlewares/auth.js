module.exports = (req, res, next) => {
    if (!req.user) {
      res.redirect('/admin/');

    } else  if (req.user.PhanHe === 'PH003') {
      res.redirect('/admin/writer');
    }
    else if (req.user.PhanHe === 'PH001') {
      res.redirect('/admin/manager');
    }
    else if (req.user.PhanHe === 'PH002') {
      res.redirect('/admin/editor');
    }else next();
  }
