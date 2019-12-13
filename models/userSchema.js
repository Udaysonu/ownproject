const mongoose=require('mongoose');  
var Schema = mongoose.Schema;

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
    photo:{
        type:String
    }
  });
var User = mongoose.model('UserSchema', userSchema);
module.exports=User;