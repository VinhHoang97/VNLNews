module.exports = (req, res, next) => {
    if (!req.user) {
        req.session.message = req.body.message;
        req.session.returnTo = req.originalUrl; 
        res.redirect('/account/login');
    } else next();
}