module.exports = (req, res, next) => {
    if (req.user && req.user.PhanHe != 'PH004') {
        res.locals.isAuthenticatedAccount = true;
        res.locals.authAccount = req.user;
    }
    next();
}