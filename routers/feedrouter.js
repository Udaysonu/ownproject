const express=require('express');
const router=express.Router();
const feedController=require('../controllers/feedController');
//using router to get home
router.post('/post_create',feedController.post_create);
router.post('/comment_create',feedController.comment_create);
router.get('/destroy_post/:id',feedController.destroy_post);
router.get('/destroy_comment/:id',feedController.destroy_comment);
router.get('/toggle',require('../controllers/likeController').toggle_like);
module.exports=router;
