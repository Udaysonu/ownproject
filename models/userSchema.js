const mongoose=require('mongoose');  
var Schema = mongoose.Schema;
var multer=require('multer');
var path=require('path');
var AVATAR_PATH=path.join("/uploads/users/avatars/");

var userSchema = new Schema({
     // String is shorthand for {type: String}
    email:{type: String,
        required:true},
    password:   {type:String,
        required:true},
    name: {type: String,
            required:true},
    dob: {type:Date,
         
     
     },
    mobile:{
        type:Number,
         
    },
    gender:{
         type:String
         
    },
    country: {
      type:String,
       
    },
    avatar:{
        type:String
    }
  });
  var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname,'..','/uploads/users/avatars/'))
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
    }
  })
  
userSchema.statics.uploadedAvatar = multer({ storage: storage }).single('avatar');  
userSchema.statics.avatarPath=AVATAR_PATH;





var User = mongoose.model('UserSchema', userSchema);
module.exports=User;