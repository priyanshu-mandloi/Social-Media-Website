const mongoose = require("mongoose");
const multer = require("multer");
const path = require('path');
// We want to also show the path where we are going to install files.
const AVATAR_PATH = path.join('/uploads/users/avatars');

const userSchema = new mongoose.Schema({
   emails:{
      type:String,
      required:true,
      unique:true
   },
   password:{
       type:String,
       required:true
   },
   name:{
       type:String,
       required:true
   },
   avatar:{
     type:String,
     
   },

   accessToken:
   {
       type: String,
       default: 'abc'
   },
   isTokenValid:
   {
       type: Boolean,
       default: false
   },
   friendships:[
     {
      type:mongoose.Schema.Types.ObjectId,
      ref:'Friendship'
     }
   ]
},{ 
    timestamps: true
});

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname,'..',AVATAR_PATH));
    },
    filename: function (req, file, cb) {
      // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, file.fieldname + '-' + Date.now());
    }
  });

  // static methods
userSchema.statics.uploadedAvatar = multer({storage:storage}).single('avatar');
userSchema.statics.avatarPath = AVATAR_PATH;
  
const User = mongoose.model('User',userSchema);
module.exports = User;