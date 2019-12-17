const Like=require('../models/likeSchema');
const Comment=require('../models/commentSchema');
const Post=require('../models/postSchema');
const User=require('../models/userSchema');
module.exports.toggle_like= async function(req,res){
    console.log('likes check1',req.query.id,req.query.type)
let likeable;
let deleted=false;
try{
if(req.query.type=='Post'){
   
    likeable = await Post.findById(req.query.id).populate('likes');
    console.log('post',likeable)

}else{
    likeable= await Comment.findById(req.query.id).populate('likes')
}
let like_exist=await Like.findOne({
    user:req.user._id,
    likeable:req.query.id,
    onModel:req.query.type
})


if(like_exist){
    likeable.likes.pull(like_exist._id);
    likeable.save();
    like_exist.remove();
    deleted=true
}else{
    let newlike=await Like.create({
        user:req.user._id,
        likeable:req.query.id,
        onModel:req.query.type
        
    });
    likeable.likes.push(newlike._id);
    likeable.save();
}

console.log('like check 2',deleted);

res.status(200).json({
    deleted:deleted,
    likes:likeable.likes.length
});
}
catch(err){
    console.log(err)
    res.return(500).json({
        message:'error'
    })

}


}
