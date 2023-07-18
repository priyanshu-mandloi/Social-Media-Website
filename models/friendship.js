const mongoose = require('mongoose');


const friendshipSchema = new mongoose.Schema({
  // User who send the friend request
   from_user:{
     type:mongoose.Schema.Types.ObjectId,
     ref:'User'
   },
   to_user:{          // user to whom request is sent
    type:mongoose.Schema.Types.ObjectId,
    ref:'User'
   },
},
{
  timestamps:true 
});

const Friendship = mongoose.model('Friendship',friendshipSchema);
module.exports = Friendship;