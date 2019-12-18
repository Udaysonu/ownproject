const nodemailer=require('../config/nodemailer');

module.exports.new_user_mailer=function(user){
    let htmlString=nodemailer.renderTemplate({new_user:user},'/comments/new_user.ejs')
    nodemailer.transporter.sendMail({
        from:"udaysonubakka123@gmail.com",
        to:user.email,
        subject:'Welcome to KeepYelling!',
        html:htmlString
    },function(err,info){
        if(err){
            console.log('Error in sending user information');
        }else{
            console.log('message sent succesfully' )
        }
    })
}