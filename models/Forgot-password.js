const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema({
   user:{
    type:mongoose.Schema.Types.ObjectId,
    required:true,
    ref:'User'
   },
   token:{
    type:String,
    required:true
   },
   createdAt:{
     type:Date,
     default:Date.now,
     expires:3600
   }
});


const Post = mongoose.model("Token",tokenSchema);
module.exports = Post;