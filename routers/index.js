const express=require('express');
const router=express.Router();
const homeController=require('../controllers/homeController');
const path=require('path')
//using router to get home
router.get('/',homeController.home);

//using router to trace the path of user
router.get('/google736069494ad5f68c.html',function(req,res){
    return res.sendFile(path.join(__dirname,"../views/google736069494ad5f68c.html") )
    })
router.use('/feed',require('./feedrouter'))
router.use('/user',require('./userrouter'));
module.exports=router;
