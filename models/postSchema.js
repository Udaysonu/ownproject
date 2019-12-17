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
     likes:[{
      type:Schema.Types.ObjectId,
      ref:'LikeSchema'
     }],
     comments:[{type:Schema.Types.ObjectId,
    ref:'CommentSchema'}]
  },{timestamps:true});
var Post = mongoose.model('PostSchema', PostSchema);
module.exports=Post;