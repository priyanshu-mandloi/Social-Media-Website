const mongoose = require('mongoose');

const forgotPasswordTokens = new mongoose.Schema({
   user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User'
   }
   

});



const Post = mongoose.model("Forgot",forgotPasswordTokens);
module.exports = Post;