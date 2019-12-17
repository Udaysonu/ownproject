const mongoose=require('mongoose');  
var Schema = mongoose.Schema;

var LikeSchema = new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:'UserSchema',
        required:true
    },
    likeable:{
        type:Schema.Types.ObjectId,
        refPath:'onModel',
        required:true
    },
    onModel:{
        type:String,
        required:true,
        enum:['Post','Comment']
    }


  },{timestamps:true});
var Like = mongoose.model('LikeSchema', LikeSchema);
module.exports=Like;