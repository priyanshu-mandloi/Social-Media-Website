// const mongoose = require("mongoose");
// const multer = require("multer");
// const path = require('path');
// // We want to also show the path where we are going to install files.
// const AVATAR_PATH = path.join('/uploads/users/avatars');

// const userSchema = new mongoose.Schema({
//    emails:{
//       type:String,
//       required:true,
//       unique:true
//    },
//    password:{
//        type:String,
//        required:true
//    },
//    name:{
//        type:String,
//        required:true
//    },
//    avatar:{
//      type:String,
     
//    },

//    accessToken:
//    {
//        type: String,
//        default: 'abc'
//    },
//    isTokenValid:
//    {
//        type: Boolean,
//        default: false
//    },
//    friendships:[
//      {
//       type:mongoose.Schema.Types.ObjectId,
//       ref:'Friendship'
//      }
//    ]
// },{ 
//     timestamps: true
// });

// let storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, path.join(__dirname,'..',AVATAR_PATH));
//     },
//     filename: function (req, file, cb) {
//       // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//       cb(null, file.fieldname + '-' + Date.now());
//     }
//   });

//   // static methods
// userSchema.statics.uploadedAvatar = multer({storage:storage}).single('avatar');
// userSchema.statics.avatarPath = AVATAR_PATH;
  
// const User = mongoose.model('User',userSchema);
// module.exports = User;

// cloudinary.config({
//   cloud_name: 'dumiwqylj',
//   api_key: '779156514365941',
//   api_secret: 'uIMH9QwggJrHoxmRAFMFIHCCo5Y'
// });



const mongoose = require("mongoose");
const multer = require("multer");
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;
const path = require('path');
require('dotenv').config();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env. cloud_name,
  api_key: process.env. api_key,
  api_secret: process.env.api_secret
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'users/avatars',
        format: async (req, file) => 'png',
        public_id: (req, file) => 'avatar-' + Date.now(),
    },
});

const upload = multer({ storage: storage });

const userSchema = new mongoose.Schema({
    email: { // Ensure `email` is used here
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
    },
    accessToken: {
        type: String,
        default: 'abc'
    },
    isTokenValid: {
        type: Boolean,
        default: false
    },
    friendships: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Friendship'
        }
    ]
}, {
    timestamps: true
});

// Static method to handle avatar upload
userSchema.statics.uploadedAvatar = upload.single('avatar');

const User = mongoose.model('User', userSchema);
module.exports = User;
