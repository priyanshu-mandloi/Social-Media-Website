const express = require("express");
const cookieParser = require('cookie-parser');
const port =  8000;
const flash = require('connect-flash');
const app = express();
var expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
const session = require("express-session");
const passport = require("passport");
const passportLocal = require('./config/passport-local-config');
const passportJWT = require('./config/passport-jwt-strategy');
const passportGoogle = require('./config/passport-google-oauth2-strategy');
const customMware = require('./config/Middleware');
const  MongoStore = require('connect-mongo');

app.use(express.urlencoded({ extended: true })); 
app.use(cookieParser());``
app.use(express.static('./assets')); 
//Make the upload part available to browser
app.use('/uploads',express.static(__dirname + '/uploads'));
app.use(expressLayouts); 

app.set('layout extractStyles',true);
app.set('layout extractScripts',true);
// for set up view engine.
app.set('view engine','ejs');
app.set('views','./views');

// mongo cookie is used to store the session cookie in the db
const sessionStore = new MongoStore({
 mongoUrl: 'mongodb://127.0.0.1:27017/codeial_db',
 autoRemove: 'disabled',
});
app.use(session({
    name:"codeial",
    // Todo to change the deployment before in production mode.
    secret:'blahsomething',
    saveUninitialized:false,
    resave:false,
    cookie:{
      maxAge:(1000*60*100)
    },
    store:sessionStore,
        
    function(err){
      console.log(err|| 'connect-mongodb setup ok');
    }
  })
);
 
 // To tell that we are using the passport
 app.use(passport.initialize());
 app.use(passport.session());

 app.use(passport.setAuthenticatedUser);

 app.use(flash());
 app.use(customMware.setFlash);
 // use express router
app.use('/',require('./routes'));

app.listen(port,function(err){
 if(err){
    // Normal way
    // console.log("Error :",err);
    // By interpolation method (use the tick)
    console.log(`Error in running the server:  ${err}`);
}

 console.log(`Server is running on the port : ${port}`);
});



