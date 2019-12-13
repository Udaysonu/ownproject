var passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User=require('../models/userSchema');

//creating the localStrategy by using passport-local-strategy
passport.use(new LocalStrategy(
{
    usernameField:'email',
    
},    function(email, password, done) {
    User.findOne({ email: email }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (user.password!==password) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));


//serializeUser is the inbuilt function 
//this function selects one field and encrypts it with the secret key and stores in session
passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  

//deserializeUser is the inbuilt function which communicates with 
// the session and decrypts the cookie using secretkey
//then this is used to find the full details of the logged in user

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

passport.checkAuthentication=function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    return res.redirect('/user/signin');
}
passport.setAuthenticateduser=function(req,res,next){
    
    if(req.isAuthenticated()){
       res.locals.user=req.user;        
    }
    next();
}
module.exports=passport;