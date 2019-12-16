var Post=require('../models/postSchema');
var User=require('../models/userSchema');
module.exports.home=async function(req,res){
    posts=await Post.find({}).sort('-createdAt').populate('user').
    populate({
        path:'comments',
        populate:{path:'user'}})
         
    all_users=await User.find({})
    // console.log(users,"0000000000000000000")
    
        
    return res.render('home',{
            title:'home',
            posts:posts,
            all_users:all_users})
    
}