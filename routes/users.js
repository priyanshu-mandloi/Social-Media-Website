const express =require('express');
const router =express.Router();
const passport = require("passport");
const usersController =require("../controllers/users_controller");
 const friendship_controller = require('../controllers/friends_controller') 

router.get('/profile/:id',passport.checkAuthentication,usersController.profile);
router.post('/update/:id',passport.checkAuthentication,usersController.update);
router.get('/sign-up',usersController.signUp);
router.get('/sign-in',usersController.signIn);
router.post('/create',usersController.create);
router.get('/profile/:id/toggle_friend', friendship_controller.toggle_friendship);
// use passport for the middileware to authenticate it
router.post("/create-session",passport.authenticate(
    'local',
    {failureRedirect : '/users/sign-in'},
),usersController.createSession);

router.get('/sign-out',usersController.destroySession);

router.get('/auth/google',passport.authenticate('google',{scope:['profile','email']}));
router.get('/auth/google/callback',passport.authenticate('google',{failureRedirect:'/users/sign-in'}),usersController.createSession);

// This is for the reset password
router.get('/reset-password', usersController.resetPassword);
router.post('/send-reset-pass-mail', usersController.resetPassMail);
router.get('/reset-password/:accessToken', usersController.setPassword);
router.post('/update-password/:accessToken', usersController.updatePassword)



module.exports = router;