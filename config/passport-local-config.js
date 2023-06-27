// require the passport
const passport = require('passport');

// Now we need to require the strategy(i.e. passport-local-config.js).
const LocalStrategy = require('passport-local').Strategy;

// Also import the user to use the functionality
const User =require('../models/users');

// use the local strategy for the authentication that who has signed in 
passport.use(new LocalStrategy({
   usernameField:"emails",
   passReqToCallback:true
  },
  async function(req,emails,password,done){
    // find a user and establish the identity
    try{    
      const user = await User.findOne({emails:emails}); // left wala emeails schema me jo he vo he write wala function ke andar wala he.
         if (!user||user.password!=password) {
            req.flash("error","Invalid Username/Password");
             return done(null, false);  // This take two arguments as first is for  error and second is whether authentication is done or not.
        }
        return done(null,user);
    }catch(e){
     req.flash('error',err);
      return done(err);
    }   
  }
));

// Serializing the user to decide which key has to be kept in the cookies.(i.e outting the id of the user who has signed in)
passport.serializeUser(function(user,done){
    done(null,user.id); 
});

// deserailizing the user from the key in the cookies.
passport.deserializeUser(function(id,done){
    User.findById(id)
    .then(function(user){
      return done(null,user);
    })
    .catch(function(err){
      console.log('Error in finding user --> Passport');
      return done(err);   
    });
});

// Checking if the user is authenticated (using this as a middilware)
passport.checkAuthentication = function(req,res,next){
  // if the user is signed in pass on the request to next function (controller's action)
  if(req.isAuthenticated()){
    return next();
   }
     // if the user is not signed
  return res.redirect('/users/sign-in'); 
}

passport.setAuthenticatedUser = function(req,res,next){
  if(req.isAuthenticated()){
    // req.user cotains the correct  signed in users from the session cookie and we are just sending this to the locals for the views
    res.locals.user = req.user;
  }
  next();
}



module.exports = passport;




//   done()--> 

         /* `return done(err)` is used to handle errors that occur during the authentication
            process. It returns the error to the passport middleware, which can then handle it
            appropriately. The `done` function is a callback function that is passed to the
            LocalStrategy constructor. It takes two arguments: the first argument is an error
            object, and the second argument is a user object. If an error occurs during the
            authentication process, the error object is passed to the `done` function, and the
            authentication process is terminated. */