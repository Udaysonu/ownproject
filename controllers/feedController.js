var Post=require('../models/postSchema');
var User=require('../models/userSchema');
var Comment=require('../models/commentSchema');
var nodemailer=require('../mailer/comment_mailer');
var postmailer=require('../mailer/post_mailer')
var Likes=require('../models/likeSchema')
module.exports.post_create=function(req,res)
{
     
    Post.create({content:req.body.content,
    user:req.body.user},function(err,post)
    {Post.findById(post._id).populate('user').exec(function(err,post){
        if(err)
        {
            
            return res.redirect('/');
        }
        else{
            postmailer.post_mailer(post)
            if(req.xhr)
            {
                console.log(post)
                return res.status(200).json({
                    data:{
                        post:post
                    },message:'Question created succesfully'
                })
            
                
            }
            console.log('Question created Sucessfully');
            req.flash('success','Question created succesfully!')
            return res.redirect('/');
        }
    })
})
}
module.exports.comment_create=function(req,res){
    
    User.findById(req.body.user,function(err,user){
         
        if(user){
            
            Comment.create({content:req.body.content,
            post:req.body.post,
        user:req.body.user},function(err,comment){
            if(err){
                 
                return res.redirect('/');
            }else{
                Post.findById(req.body.post).populate('user').exec(function(err,post){
                    // console.log('entered check 4', comment.id);
                    post.comments.push(comment.id);
                    
                    // console.log(post);
                    post.save();
                    nodemailer.comment_mailer(post);
                    
                    console.log('comment succesfully created');
                    if(req.xhr){
                        return res.status(200).json({
                            comment:comment
                        })
                    }

                    req.flash('success','Comment created Succesfully!')
                     return res.redirect('/')

                })
               
            }
        })
        }
    })
}
 

module.exports.destroy_comment=async function(req,res){

try{
    if(!req.params.id){
        return res.redirect('back');
    }

    let comment = await Comment.findById(req.params.id)
 await  Post.findByIdAndUpdate(comment.post, {$pull: {comments: comment.id}})
    comment.remove();
   await  Likes.deleteMany({likeable:req.params.id})
    if(req.xhr){
        return res.status(200).json({
            messsage:"comment removed succesfully"
        })
    }
    req.flash('success','Comment deleted Succesfully!');
    return res.redirect("back");
}
catch(err){
    
    return res.redirect("back");
}
}
module.exports.destroy_post=async function(req,res){
    
    try{
    post=await Post.findById(req.params.id,function(err,post){
         if(!post){
             return res.redirect('back')
         }
      
    if(post.user==req.user.id){
                
                Likes.deleteMany({likeable:req.params.id},function(err){
                    console.log('likes deleted')
                })
                post.remove()
              
    Comment.deleteMany({post:req.params.id},function(err){
                
                    
                })
    if(req.xhr){
                 
                    return res.status(200).json({data:{
                        post_id:req.params.id
                    }})
                }
    req.flash('success','Question and associated Answerss deleted succesfully!!')
    return res.redirect('back')}
    })}
    catch(error){
        if(error){
            console.log('error detected');
return res.redirect(back);
    }}
}