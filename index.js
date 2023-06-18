const express = require("express");
const cookieParser = require('cookie-parser');
const port =  8000;
const app = express();
var expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
const session = require("express-session");
const passport = require("passport");
const passportLocal = require('./config/passport-local-config');
app.use(express.urlencoded()); 
app.use(cookieParser());
app.use(express.static('./assets')); 
app.use(expressLayouts); 

app.set('layout extractStyles',true);
app.set('layout extractScripts',true);
// for set up view engine.
app.set('view engine','ejs');
app.set('views','./views');

// we will add the cookies
app.use(session({
    name:"codeial",
    // Todo to change the deployment before in production mode.
    secret:'blahsomething',
    saveUninitialized:false,
    resave:false,
    cookie:{
      maxAge:(1000*60*100)
    }
}));
 
 // To tell that we are using the passport
 app.use(passport.initialize());
 app.use(passport.session());

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