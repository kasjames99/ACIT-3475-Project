var express = require('express');  
var path = require('path');  
var cookieParser = require('cookie-parser');  
var logger = require('morgan');  
var passport = require('passport');  
var session = require('express-session');  
var createError = require('http-errors');  
var GoogleStrategy = require('passport-google-oauth20').Strategy;  
require('dotenv').config(); // Load environment variables from .env file  

var indexRouter = require('./routes/index');  
var authRouter = require('./routes/auth');  

var app = express();  

// Passport configuration  
passport.use(new GoogleStrategy({  
    clientID: process.env.GOOGLE_CLIENT_ID,  // Use environment variable  
    clientSecret: process.env.GOOGLE_CLIENT_SECRET, // Use environment variable  
    callbackURL: 'http://localhost:3000/auth/google/callback' // Ensure this matches your Google Cloud Console  
}, function(accessToken, refreshToken, profile, cb) {  
    return cb(null, profile);  
}));  

passport.serializeUser(function(user, done) {  
    done(null, user);  
});  

passport.deserializeUser(function(obj, done) {  
    done(null, obj);  
});  

// Middleware setup  
app.use(session({ secret: 'cat', resave: false, saveUninitialized: true }));  
app.use(passport.initialize());  
app.use(passport.session());  

app.use(express.static(path.join(__dirname, 'public')));  
app.set('views', path.join(__dirname, 'views'));  
app.set('view engine', 'ejs');  

app.use(logger('dev'));  
app.use(express.json());  
app.use(express.urlencoded({ extended: false }));  
app.use(cookieParser());  

// Routes  
app.use('/', indexRouter);  
app.use('/auth', authRouter); // Use the auth router for authentication  

app.use(function(req, res, next) {  
    next(createError(404));  
});  

app.use(function(err, req, res, next) {  
    res.locals.message = err.message;  
    res.locals.error = req.app.get('env') === 'development' ? err : {};  
    res.status(err.status || 500);  
    res.render('error');  
});  

const PORT = process.env.PORT || 3000;  
app.listen(PORT, () => {  
    console.log(`Server is running on http://localhost:${PORT}`);  
});  

module.exports = app;