const User=require('../models/userSchema');
const passport=require('passport');
const multer=require('multer');
const usermailer=require('../mailer/signup_mailer');
module.exports.signin=function(req,res){
    if(req.isAuthenticated()){
        req.flasj('info','User Already Signed In')
        return res.redirect('/');
    }
    return res.render('signin',{title:"Sign-In"});
}
module.exports.singup=function(req,res){
    if(req.isAuthenticated()){
        req.flash('info','User Already Signed In')
        return res.redirect('/')
    }

    return res.render('signup', {
        title:"sign Up"
    });
}
module.exports.createUser=function(req,res){
    if(req.body.password==req.body.re_password){
    User.findOne({email:req.body.email},function(err,user){
        if(err){
            console.log('Error in finding the user during signup')
        }
        if(user){
            req.flash('info','User Already exists with the email')
            console.log('User already exists with the email');
            return res.redirect('back');
        }else{

            User.create(req.body,function(err,user){
                if(err){
                    req.flash('error','Error in Signing up')
                    console.log('Error in creating User in signup -- check 2',err);

                return res.redirect('back');
                }else{
                    usermailer.new_user_mailer(user)
                    req.flash('success','Succesfully Signed Up!! Login to continue')
                    return res.redirect('/user/signin');
                }

            })
        }

    })}
    else{
        return res.redirect('back');
    }
   
}
module.exports.authenticate=function(req,res){
    if(req.isAuthenticated()){
        req.flash('info','Already signed in !!!')
       return res.redirect('/')
    }
    else{
        
        return res.redirect('/user/signin');
    }   
}
module.exports.destroySession=function(req,res){
    if(req.isAuthenticated){
        req.flash('success','You logged out!!!')
        req.logout();
    }
    return res.redirect('/user/signin');
}

module.exports.profile=function(req,res){
    User.findById(req.params.id,function(err,user_profile){
        // console.log(user_profile,req.params.id);
        return res.render('profile',{
            title:'Profile',
            user_profile:user_profile
        })
    })
}
module.exports.update_profile=function(req,res){
    //  console.log(user)

    User.uploadedAvatar(req,res,function(err){

  if(err){
      console.log('error in uploaded avatar',err);
      req.flash('error','Error in uploading Picture')
      return res.redirect('back')
  }else{
    User.findByIdAndUpdate(req.params.id,req.body,function(err,user){
        console.log(req.body,req.file);
        
        user.avatar=User.avatarPath+'/'+req.file.filename;
        user.save();
        req.flash('success','Succesfully updated Profile')
        console.log('updated succesfully-- check 1');
        return res.redirect('back')
    })
}
})
     
}