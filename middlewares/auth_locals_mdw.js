module.exports = (req, res, next) => {
  if (req.user) {
    if (req.user.PhanHe === 'PH003') {
      res.locals.isPV = true;
      res.locals.isAuthenticated = true;
      res.locals.authUser = req.user;
      
    }
    else if (req.user.PhanHe === 'PH001') {
      res.locals.isAdmin = true;
      res.locals.isAuthenticated = true;
      res.locals.authUser = req.user;
    }

    else if (req.user.PhanHe === 'PH002') {
      res.locals.isBTV = true;
      res.locals.isAuthenticated = true;
      res.locals.authUser = req.user;
    }

    // res.locals.isAuthenticated = true;
    // res.locals.authUser = req.user;
  } next();
}
