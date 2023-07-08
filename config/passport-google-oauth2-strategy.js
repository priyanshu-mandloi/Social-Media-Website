const passport = require("passport");
const googleStrategy = require("passport-google-oauth").OAuth2Strategy;
const crypto = require("crypto");
const User = require("../models/users");
const { Router } = require("express");

//To tell the passport to use the  google strategy.
passport.use(
  new googleStrategy(
    {
      client_id:
        "955434243353-f6fihg550sqilp4qamb30i5si2f1emak.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "http://localhost:8000/users/auth/google/callback",
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