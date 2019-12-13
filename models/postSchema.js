const mongoose=require('mongoose');  
var Schema = mongoose.Schema;

var PostSchema = new Schema({
     // String is shorthand for {type: String}
     content:{
         type:String,
         required:true
     },
     user:{
         type:Schema.Types.ObjectId,
         ref:'UserSchema',
         required:true
     },
     comments:[{type:Schema.Types.ObjectId,
    ref:'CommentSchema'}]
  });
var Post = mongoose.model('PostSchema', PostSchema);
module.exports=Post;