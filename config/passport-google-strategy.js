var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var User=require('../models/userSchema');
// Use the GoogleStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Google
//   profile), and invoke a callback with a user object.
passport.use(new GoogleStrategy({
    clientID: '650113212823-sfgongmj2tvnv3luooe55ml0am64lmjj.apps.googleusercontent.com',
    clientSecret:'Rb9LVw-qoejWn8amAEYV48sR',
    callbackURL: " http://3.15.176.32:8000//user/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    console.log(profile);
       User.findById(profile.emails[0].value, function (err, user) {
           if(user){
         return done(err, user);}
         User.create({name:profile.displayName,
        email:profile.emails[0].value,
      password:'phonenumber',
      avatar:profile.photos[0].value
   },function(err,user){
    console.log('boooooooooooooooooom');
    done(null,user)
   })
         
            
       });
  }
));
