// Require and configure dotenv
require('dotenv').config();

const passport = require("passport");
const googleStrategy = require("passport-google-oauth").OAuth2Strategy;
const crypto = require("crypto");
const User = require("../models/users");

//To tell the passport to use the  google strategy.
passport.use(
  new googleStrategy({
    clientID: process.env.Codeial_client_ID,
    clientSecret: process.env.Codeial_client_Secret,
    callbackURL: process.env.Codeial_callback_URL,
  },
    async function (accessToken, refreshToken, profile, done) {
      try {
        // find a user
        const user = await User.findOne({
          emails: profile.emails[0].value,
        }).exec();
        if (user) {
            // if found set this user as req.user.
          return done(null, user);
        } else {
            // if not found than create the user and set it as req.user. (i.e signin that user)
         await User.create({
            name: profile.displayName,
            emails: profile.emails[0].value,
            password: crypto.randomBytes(20).toString("hex"),
          });
        }
      } catch (err) {
        return done(err, false);
      }
    }
  )
);

module.exports = passport;
