/* Require Environment Variables if they don't exist */
if (!process.env.S3_BUCKET){
    require('./config/env.js');
}

/* Require Modules */
const express      = require('express');
const aws          = require('aws-sdk');
const app          = express();
const mongoose     = require('mongoose');
const passport     = require('passport');
const flash        = require('connect-flash');
const morgan       = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser   = require('body-parser');
const session      = require('express-session');
const MongoStore   = require('connect-mongo')(session);

/* Configure */
const port     = process.env.PORT || 3000;
const configDB = require('./config/database.js');
mongoose.connect(configDB.url);
require('./config/passport')(passport);
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', './app/views');
app.use(session({ 
	secret: 'ilovethisnodejstemplate',
	resave: false,
	saveUninitialized: true,
	store: new MongoStore({ mongooseConnection: mongoose.connection }),
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(express.static(__dirname + '/public'));


app.use(function (req, res, next) {
    res.locals.appTitle = process.env.APP_TITLE;
    res.locals.appAdmin = process.env.APP_ADMIN;
    if (req.user) {
        res.locals.user = req.user;
        res.locals.isLoggedIn = true;
    } else {
        res.locals.user = null;
        res.locals.isLoggedIn = false;
    }
    return next(); 
});

/* Routes */
require('./app/routes/passport.js')(app, passport);
require('./app/routes/static.js')(app); 
require('./app/routes/users.js')(app);


/* Launch */
app.listen(port, function () {
	console.log('Application Started...');
	console.log('Open your browser and go to localhost:' + port);
});