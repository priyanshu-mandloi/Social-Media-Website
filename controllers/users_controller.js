const User = require("../models/users");
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const queue = require('../config/Kue');
const Friendship = require('../models/friendship');
const reset_Password = require("../mailers/reset_password_mailer");
const userEmailWorker = require('../workers/user_email_worker');

// const User = require('../models/users');
const cloudinary = require('cloudinary').v2;

module.exports.profile= async function(req,res){
  try{
     const user =  await User.findById(req.params.id);
     let are_friends = false;
     const friendship = await Friendship.findOne({
       $or: [
         { from_user: req.user._id, to_user: req.params.id },
         { from_user: req.params.id, to_user: req.user._id }
       ]
     });
 
     if (friendship) {
       are_friends = true;
     }
     
     if(user){
       return res.render('users',{
         title:"Users",
         profile_user:user,
         are_friends:are_friends
        });
     }
  }catch(err){
    console.error(err);
  }
}


// Creating an action for the updation of the users profile
// module.exports.update = async function(req,res){
//   if(req.user.id == req.params.id){
//       try{
//         let user = await User.findById(req.params.id);
//         User.uploadedAvatar(req,res,function(err){
//           if(err){console.log("*****Multer Error: ",err)}
          
//           user.name = req.body.name;
//           user.emails = req.body.emails;
          
//           if(req.file){
           
//              // For deleting the modules we will require the file system and path
//              if(user.avatar){
//               fs.unlinkSync(path.join(__dirname,'..',user.avatar));
//              }

//             // Saving the path of the uploaded file into the avatar filed in the user.
//             user.avatar = User.avatarPath + '/' + req.file.filename;
//           }
//           user.save();
//           return res.redirect('back');
//         });
//       }catch(err){
//         req.flash('error',err);
//         return res.redirect('back');
//       }
//     }else{
//     req.flash('error', 'Unauthorized!');
//     return res.status(401).send('Unauthorized'); 
//   }
// }





module.exports.update = async function(req, res) {
    if (req.user.id == req.params.id) {
        try {
            let user = await User.findById(req.params.id);
            User.uploadedAvatar(req, res, async function(err) {
                if (err) {
                    console.log("*****Multer Error: ", err);
                    req.flash('error', 'Error uploading file');
                    return res.redirect('back');
                }

                user.name = req.body.name;
                user.email = req.body.email; // Ensure `email` is used here

                if (req.file) {
                    // If a new file is uploaded, remove the old avatar from Cloudinary if it exists
                    if (user.avatar) {
                        const publicId = user.avatar.split('/').pop().split('.')[0];
                        cloudinary.uploader.destroy(publicId, function(error, result) {
                            if (error) {
                                console.log('Error deleting old avatar from Cloudinary:', error);
                            } else {
                                console.log('Old avatar deleted from Cloudinary:', result);
                            }
                        });
                    }

                    // Save the new avatar URL
                    user.avatar = req.file.path;
                }

                await user.save();
                req.flash('success', 'Profile updated successfully');
                return res.redirect('back');
            });
        } catch (err) {
            console.log("Error: ", err);
            req.flash('error', err.message);
            return res.redirect('back');
        }
    } else {
        req.flash('error', 'Unauthorized!');
        return res.status(401).send('Unauthorized');
    }
};




// render the signup page
module.exports.signUp = function(req,res){
   if(req.isAuthenticated()){
     return res.redirect('/users/profile');
   }
    return res.render('users_sign_up',{
       title:"Codeial | Sign Up"
    });
}

// render the signin page
module.exports.signIn = function(req,res){
  if(req.isAuthenticated()){
    return res.redirect('/users/profile');
  }
    return res.render('users_sign_in',{
       title:"Codeial | Sign In"
    });
}


// get the signup data
module.exports.create = async function(req, res) {
    try {
      if (req.body.password !== req.body.confirm_password) {
        return res.redirect('back');
      }
  
      const existingUser = await User.findOne({ emails: req.body.emails });
      if (existingUser) {
        req.flash('success', 'You have signed up, login to continue!');
        return res.redirect('back');
      }
  
      await User.create(req.body);
      
      return res.redirect('/users/sign-in');
    } catch (err) {
      req.flash('error', err);
           // Redirect to sign-in page even if an error occurs
      return res.redirect('/users/sign-in');
    }
  };
  

// create the signin data
module.exports.createSession=function(req,res){ 
  req.flash('success','Logged in succesfully!');
  return res.redirect('/');
}

// destroy the session
module.exports.destroySession=function(req,res){
  req.logout(function(err) {
    if (err) { return next(err); }
    req.flash('success','Logged out succesfully!');
    res.redirect('/');
  });
}


// For the password reset
module.exports.resetPassword = function(req, res)
{
    return res.render('reset_password',
    {
        title: 'Codeial | Reset Password',
        access: false
    });
}

module.exports.resetPassMail = async function(req, res) {
  try {
    const user = await User.findOne({ emails: req.body.emails });

    if (user) {
      if (user.isTokenValid === false) {
        user.accessToken = crypto.randomBytes(30).toString('hex');
        user.isTokenValid = true;
        await user.save();
      }
        
      reset_Password.resetPassword(user);         
      req.flash('success', 'Password reset link sent. Please check your mail');
      return res.redirect('/');
    } else {
      req.flash('error', 'User not found. Try again!');
      return res.redirect('back');
    }
  } catch (err) {
    console.log('Error in finding user', err);
    return;
  }
};

module.exports.setPassword = async function(req, res) {
  try {
    const user = await User.findOne({ accessToken: req.params.accessToken });
      
    if (user.isTokenValid) {
      return res.render('reset_password', {
        title: 'Codeial | Reset Password',
        access: true,
        accessToken: req.params.accessToken
      });
    } else {
      req.flash('error', 'Link expired');
      return res.redirect('/users/reset-password');
    }
  } catch (err) {
    console.log('Error in finding user', err);
    return;
  }
};

module.exports.updatePassword = async function(req, res) {
  try {
    const user = await User.findOne({ accessToken: req.params.accessToken });

    if (user.isTokenValid) {
      if (req.body.newPass === req.body.confirmPass) {
        user.password = req.body.newPass;
        user.isTokenValid = false;
        await user.save();
        req.flash('success', 'Password updated. Login now!');
        return res.redirect('/users/sign-in');
      } else {
        req.flash('error', "Passwords don't match");
        return res.redirect('back');
      }
    } else {
      req.flash('error', 'Link expired');
      return res.redirect('/users/reset-password');
    }
  } catch (err) {
    console.log('Error in finding user', err);
    return;
  }
};








