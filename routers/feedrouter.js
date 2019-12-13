const express=require('express');
const router=express.Router();
const feedController=require('../controllers/feedController');
//using router to get home
router.post('/post_create',feedController.post_create);
router.post('/comment_create',feedController.comment_create);
module.exports=router;
