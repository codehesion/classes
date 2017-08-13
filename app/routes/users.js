/* Require Modules */
const moment   = require('moment');

/* Load Models */
const User     = require('../models/user');  

/* Middleware */
const loginRequired = require('../middleware/loginRequired');
const adminRequired = require('../middleware/adminRequired');

module.exports = function(app) {

    /* Profile Page */
    app.get('/profile', loginRequired, function(req, res) {
        let formattedDate = moment(req.user.local.createdAt).fromNow();
        res.render('users/profile.ejs', {
            title : "Profile",
            createdAt : formattedDate,
        });
    }); 

    app.get('/profile/edit', loginRequired, function(req, res) {
        res.render('users/editProfile.ejs', {
            title : "Edit Profile",
            user : req.user
        });
    });

    /* Profile Edit */
    app.post('/profile/edit', loginRequired, function(req, res) {
        var email = req.body.profileEmail;
        var phoneNumber = req.body.profilePhoneNumber;
        var avatarUrl = req.body.avatarUrl;
        User.update({_id: req.body.userId}, {
            'local.email': email,
            'local.phoneNumber': phoneNumber,
            'local.avatarUrl': avatarUrl,
        }, function(err, response){
            if (err) { 
                throw(err)
            } else {
                console.log('response: ' + response);
                res.redirect('/profile');
            }
        });
    });

    /* Profile Page */
    app.get('/users', adminRequired, function(req, res) {
        User.find({}, function(error, users){
            res.render('users/userList.ejs', {
                title : "User List",
                users: users,
            });
        });
    });    

    /* Profile Page */
    app.get('/users/:username', adminRequired, function(req, res) {
        User.findOne({"local.username": req.params.username}, function(error, profileUser){
            let formattedDate = moment(profileUser.local.createdAt).fromNow();
            res.render('users/userProfile.ejs', {
                title : "User Profile",
                profileUser: profileUser,
                createdAt : formattedDate,
            });
        });
    }); 

}; // end module export