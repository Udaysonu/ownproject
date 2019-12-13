const express=require('express');
const router=express.Router();
const homeController=require('../controllers/homeController');
//using router to get home
router.get('/',homeController.home);

//using router to trace the path of user
router.use('/feed',require('./feedrouter'))
router.use('/user',require('./userrouter'));
module.exports=router;
