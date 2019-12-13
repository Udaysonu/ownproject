const mongoose=require('mongoose');  
var Schema = mongoose.Schema;

var CommentSchema = new Schema({
     // String is shorthand for {type: String}
     content:{
         type:String,
         required:true
     },
    post:{
        type:Schema.Types.ObjectId,
        ref:'PostSchema'
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:'UserSchema'
    }
  });
var Comment = mongoose.model('CommentSchema', CommentSchema);
module.exports=Comment;