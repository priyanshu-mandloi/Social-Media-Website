const express =require('express');
const router =express.Router();
const passport = require("passport");
const usersController =require("../controllers/users_controller");

router.get('/profile',usersController.profile);
router.get('/sign-up',usersController.signUp);
router.get('/sign-in',usersController.signIn);
router.post('/create',usersController.create);

// use passport for the middileware to authenticate it
router.post("/create-session",passport.authenticate(
    'local',
    {failureRedirect : '/users/sign-in'},
),usersController.createSession);

module.exports = router;