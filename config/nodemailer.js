const nodemailer = require("nodemailer");

const ejs=require('ejs');
const path=require('path');
// async..await is not allowed in global scope, must use a wrapper
 
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
 

  // create reusable transporter object using the default SMTP transport
 module.exports.transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'udaysonubakka123@gmail.com', // generated ethereal user
      pass: "udayyadusonu1" // generated ethereal password
    }
  });

 
module.exports.renderTemplate=(data,relativepath)=>{
    let mailHTML;
    console.log(data);
    ejs.renderFile(
        path.join(__dirname,'../views/mailers',relativepath),
            data,function(err,template){
                if(err){
                    console.log('Error in rendering Template');
                    return
                }
                mailHTML=template
            }
        
    )
    return mailHTML;
}
 

  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
 
 