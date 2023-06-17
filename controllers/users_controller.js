const User = require("../models/users");
// const user = require("../models/users");

module.exports.profile=function(req,res){
    // return res.end('<h1>Profile!</h1>');
    return res.render('users',{
        title:"Users"
    });
}
 
// render the signup page
module.exports.signUp = function(req,res){
    return res.render('users_sign_up',{
       title:"Codeial | Sign Up"
    });
}

// render the signin page
module.exports.signIn = function(req,res){
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
  

// create the sgnin data
module.exports.createSession=function(req,res){ 
  
}