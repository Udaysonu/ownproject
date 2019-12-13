const nodemailer=require('../config/nodemailer');

module.exports.comment_mailer=function(post){
    let htmlString=nodemailer.renderTemplate({post:post},'/comments/new_comment.ejs')
    nodemailer.transporter.sendMail({
        from:"thirumala9ravibabu@gmail.com",
        to:post.user.email,
        subject:'New Comment on your post',
        html:htmlString
    },function(err,info){
        if(err){
            console.log('Error in sending user information');
        }else{
            console.log('message sent succesfully' )
        }
    })
}