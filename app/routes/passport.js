module.exports = function(app, passport) {

    /* Login Page */
    app.get('/login', function(req, res) {
        res.render('passport/login.ejs', { 
            message : req.flash('loginMessage'),
            title : "Login", 
        }); 
    });

    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/profile',
        failureRedirect : '/login',
        failureFlash : true
    }));

    /* Signup Page */
    app.get('/signup', function(req, res) {
        res.render('passport/signup.ejs', { 
            title : "Sign Up",
            message: req.flash('signupMessage'), 
        });
    });

    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/profile',
        failureRedirect : '/signup',
        failureFlash : true,
    }));

    /* Logout */
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

}; // end module export
