const User=require('../models/userSchema');
const passport=require('passport');
module.exports.signin=function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/');
    }
    return res.render('signin');
}
module.exports.singup=function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/')
    }
    return res.render('signup');
}
module.exports.createUser=function(req,res){
    if(req.body.password==req.body.re_password){
    User.findOne({email:req.body.email},function(err,user){
        if(err){
            console.log('Error in finding the user during signup')
        }
        if(user){
            console.log('User already exists with the email');
            return res.redirect('back');
        }else{
            User.create(req.body,function(err,user){
                if(err){
                    console.log('Error in creating User in signup -- check 2',err);
                return res.redirect('back');
                }else{
                    return res.redirect('/');
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
       return res.redirect('/')
    }
    else{
        return res.redirect('/user/signin');
    }   
}
module.exports.destroySession=function(req,res){
    if(req.isAuthenticated){
        req.logout();
    }
    return res.redirect('/user/signin');
}

module.exports.profile=function(req,res){
    User.findById(req.params.id,function(err,user_profile){
        // console.log(user_profile,req.params.id);
        return res.render('profile',{
            user_profile:user_profile
        })
    })
}
module.exports.update_profile=function(req,res){
    //  console.log(user)
    User.findByIdAndUpdate(req.params.id,req.body,function(err,user){
        console.log('updated succesfully-- check 1');
        return res.redirect('back')
    })
     
}