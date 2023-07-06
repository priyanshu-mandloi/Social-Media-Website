const passport = require('passport');
const JWTStratgy  = require('passport-jwt').Strategy;
const extractJWT =  require('passport-jwt').ExtractJwt; // This will help to extract from the header
const User =require('../models/users');
const { ExtractJwt } = require('passport-jwt');
let opts = {
    jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken,
    secretOrKey : 'codeial'
}

passport.use(new JWTStratgy(opts,function(jwtPayLoad,done){
     User.findById(jwtPayLoad._id,function(err,user){
        if(err){
            console.log('Error in finding user from JWT');
            return;
        }

        if(user){
            return done(null,user);
        }else{
            return done(null,false);
        }
     });
}));

module.exports = passport;