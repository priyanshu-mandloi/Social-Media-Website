const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  content:{
    type:String,
    required:true
  },
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User'
  },
  // include the array of the ids for all comment in the array itself.
  comments:[
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:'Comment'
    }
],
// include the array of the likes to the posts
 likes:[
  {
    type: mongoose.Schema.Types.ObjectId,
    ref:'Like'
  }
 ]
},{
    timestamps:true
});

const Post = mongoose.model('Post',postSchema);
module.exports = Post;
