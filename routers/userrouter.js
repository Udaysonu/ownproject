const express=require('express');
const router=express.Router();
const userController=require('../controllers/userController');
const passport=require('passport');
router.get('/signin',userController.signin);
router.get('/signup',userController.singup);
router.post('/authenticate',passport.authenticate('local',{
    failureRedirect:'/user/signin'
}),userController.authenticate);
router.get('/profile/:id' ,userController.profile);
router.get('/signout',userController.destroySession)
router.post('/create_user',userController.createUser);
router.post('/update_profile/:id',userController.update_profile)
// GET /auth/google
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in Google authentication will involve
//   redirecting the user to google.com.  After authorization, Google
//   will redirect the user back to this application at /auth/google/callback
router.get('/auth/google',
  passport.authenticate('google', { scope: ['profile','email','phone'] }));

// GET /auth/google/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
router.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/user/signin' }),
  function(req, res) {
    res.redirect('/');
  });
module.exports=router;
