var Post=require('../models/postSchema');
var User=require('../models/userSchema');
var Comment=require('../models/commentSchema');
var nodemailer=require('../mailer/comment_mailer');
module.exports.post_create=function(req,res){
    console.log(req.body,'****************')
    Post.create({content:req.body.content,
    user:req.body.user},function(err,post){
        if(err){
            console.log('Error in creating the Post',req.body);
            return res.redirect('/');
        }
        else{
            console.log('Post created Sucessfully');
            return res.redirect('/');
        }
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
                 
                console.log('comment succesfully created');
                 return res.redirect('/')
            }
        })
        }
    })
}
 