const User = require("../models/users");
const fs = require('fs');
const path = require('path');
module.exports.profile= async function(req,res){
  try{
     const user =  await User.findById(req.params.id);
    //  console.log("Created a user : ",user);
     if(user){
       return res.render('users',{
         title:"Users",
         profile_user:user
        });
     }
  }catch(err){
    console.error(err);
  }
}

// Creating an action for the updation of the users profile
module.exports.update = async function(req,res){
  if(req.user.id == req.params.id){
      try{
        let user = await User.findById(req.params.id);
        User.uploadedAvatar(req,res,function(err){
          if(err){console.log("*****Multer Error: ",err)}
          
          user.name = req.body.name;
          user.emails = req.body.emails;
          
          if(req.file){
           
             // For deleting the modules we will require the file system and path
             if(user.avatar){
              fs.unlinkSync(path.join(__dirname,'..',user.avatar));
             }

            // Saving the path of the uploaded file into the avatar filed in the user.
            user.avatar = User.avatarPath + '/' + req.file.filename;
          }
          user.save();
          return res.redirect('back');
        });
      }catch(err){
        req.flash('error',err);
        return res.redirect('back');
      }
    }else{
    req.flash('error', 'Unauthorized!');
    return res.status(401).send('Unauthorized'); 
  }
}
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