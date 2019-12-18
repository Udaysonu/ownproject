const nodemailer=require('../config/nodemailer');

module.exports.post_mailer=function(post){
    let htmlString=nodemailer.renderTemplate({post:post},'/comments/new_post.ejs')
    nodemailer.transporter.sendMail({
        from:"udaysonubakka123@gmail.com",
        to:post.user.email,
        subject:'Question Created Succesfully !',
        html:htmlString
    },function(err,info){
        if(err){
            console.log('Error in sending user information');
        }else{
            console.log('message sent succesfully' )
        }
    })
}