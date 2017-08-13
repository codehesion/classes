module.exports = function(req, res, next) {
    /* Set User & IsLoggedIn Local Variables */
    if (req.user) {
        res.locals.user = req.user;
        res.locals.isLoggedIn = true;
    } else {
        res.locals.user = null;
        res.locals.isLoggedIn = false;
    }
    return next();  	
};