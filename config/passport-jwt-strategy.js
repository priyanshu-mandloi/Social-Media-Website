const passport = require('passport');
const JWTStrategy  = require('passport-jwt').Strategy;
const extractJWT =  require('passport-jwt').ExtractJwt; // This will help to extract from the header
const User =require('../models/users');
const enviornment = require('./enviornment');
const { ExtractJwt } = require('passport-jwt');
let opts = {
    jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey : enviornment.jwtStrategy
}

passport.use(new JWTStrategy(opts, async (jwtPayload, done) => {
    try {
      const user = await User.findOne({ id: jwtPayload.sub });
  
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (err) {
      return done(err, false);
    }
  }));
  

module.exports = passport;