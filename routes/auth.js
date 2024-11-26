var express = require('express');  
var passport = require('passport');  
var router = express.Router();  

// Google OAuth route  
router.get('/google', passport.authenticate('google', {  
    scope: ['profile', 'email']  
}));  

// Google OAuth callback route  
router.get('/google/callback',  
    passport.authenticate('google', { failureRedirect: '/error/' }),  
    function(req, res) {  
        // Successful authentication, redirect home with user info  
        const user = req.user;  
        res.redirect(`/?name=${encodeURIComponent(user.displayName)}`);  
    }  
);  

router.get('/logout', function(req, res) {  
    req.logout(function(err) {  
        if (err) { return next(err); }  
        res.redirect('/');
    });  
});  

module.exports = router;
//this