var Post=require('../models/postSchema');
var User=require('../models/userSchema');
var Comment=require('../models/commentSchema');
var nodemailer=require('../mailer/comment_mailer');
module.exports.post_create=function(req,res)
{
    console.log(req.body,'****************')
    Post.create({content:req.body.content,
    user:req.body.user},function(err,post)
    {Post.findById(post._id).populate('user').exec(function(err,post){
        if(err)
        {
            console.log('Error in creating the Post',req.body);
            return res.redirect('/');
        }
        else{
            if(req.xhr)
            {
                console.log(post)
                return res.status(200).json({
                    data:{
                        post:post
                    },message:'Post created succesfully'
                })
            
                
            }
            console.log('Post created Sucessfully');
            req.flash('success','Post created succesfully!')
            return res.redirect('/');
        }
    })
})
}
module.exports.comment_create=function(req,res){
    console.log('entered check 1',req.body)
    User.findById(req.body.user,function(err,user){
        console.log('enterted check 2')
        if(user){
            console.log('enterd check 3');
            Comment.create({content:req.body.content,
            post:req.body.post,
        user:req.body.user},function(err,comment){
            if(err){
                console.log('Error in creating comment check 1');
                return res.redirect('/');
            }else{
                Post.findById(req.body.post).populate('user').exec(function(err,post){
                    // console.log('entered check 4', comment.id);
                    post.comments.push(comment.id);
                    
                    // console.log(post);
                    post.save();
                    nodemailer.comment_mailer(post);

                })
                 req.flash('success','Comment created Succesfully!')
                console.log('comment succesfully created');
                 return res.redirect('/')
            }
        })
        }
    })
}
 

module.exports.destroy_comment=function(req,res){
Comment.findById(req.params.id,function(err,comment){
    Post.findByIdAndUpdate(comment.post, {$pull: {comments: comment.id}},function(err,user){
        
    })
    comment.remove();
    req.flash('success','Comment deleted Succesfully!');
    return res.redirect("back");
    
})


}
module.exports.destroy_post=async function(req,res){
    console.log('check1',req.params.id)
    try{
    post=await Post.findById(req.params.id,function(err,post){
         
      
    if(post.user==req.user.id){
                console.log(post.user,req.user.id,'check2')
                post.remove()
                req.flash('success','Post and associated comments deleted succesfully!!')
    Comment.deleteMany({post:req.params.id},function(err){
                 
                    
                })
    if(req.xhr){
                 
                    return res.status(200).json({data:{
                        post_id:req.params.id
                    }})
                }
    return res.redirect('back')}
    })}
    catch(error){
        if(error){
            console.log('error detected');
return res.redirect(back);
    }}
}