const User = require("../models/users");
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
        return res.redirect('back');
      }
  
      await User.create(req.body);
  
      return res.redirect('/users/sign-in');
    } catch (err) {
      console.log('Error in creating a user while signing up:', err);
      // Redirect to sign-in page even if an error occurs
      return res.redirect('/users/sign-in');
    }
  };
  

// create the signin data
module.exports.createSession=function(req,res){ 
  return res.redirect('/');
}

// destroy the session
module.exports.destroySession=function(req,res){
   req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
}