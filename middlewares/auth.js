module.exports = (req, res, next) => {
    if (!req.user) {
      res.redirect('/admin/admin_login');
    } else next();
  }
  