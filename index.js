const express = require("express");
const enviornment = require('./config/enviornment');
const logger = require('morgan'); 
const cookieParser = require('cookie-parser');
const port =  process.env.PORT||8000;
require("dotenv").config();
console.log(process.env.PORT);
const flash = require('connect-flash');
const app = express();
// console.log(process.env.port);
// require('./config/view-helper')(app);s
var expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
const session = require("express-session");
const passport = require("passport");
const passportLocal = require('./config/passport-local-config');
const passportJWT = require('./config/passport-jwt-strategy');
const passportGoogle = require('./config/passport-google-oauth2-strategy');
const customMware = require('./config/Middleware');
const mongoose = require("mongoose");
const  MongoStore = require('connect-mongo');
const { env } = require("process");
// Setting up for the web sockets
const chatServer = require('http').createServer(app);
const chatSockets = require('./config/chats_socket').chatSockets(chatServer);
chatServer.listen(5000);
console.log("Chat server is listening on port: 5000");
app.use(express.urlencoded({ extended: true })); 
app.use(cookieParser());
app.use(express.static('./assets')); 
//Make the upload part available to browser
app.use('/uploads',express.static(__dirname + '/uploads'));
app.use(logger(enviornment.morgan.mode,enviornment.morgan.options));
app.use(expressLayouts); 
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);
// for set up view engine.
app.set('view engine','ejs');
app.set('views','./views');
// mongo cookie is used to store the session cookie in the db
// const sessionStore = new MongoStore({
//  mongoUrl: process.env.DB_URL,
// // mongoUrl: 'mongodb://127.0.0.1:27017/codeial_db',
//  autoRemove: 'disabled',
// });
app.use(session({
    name:"codeial",
    // Todo to change the deployment before in production mode.
    secret:enviornment.session_cookie_key,
    saveUninitialized:false,
    resave:false,
    cookie:{
      maxAge:(1000*60*100)
    },
    // store:sessionStore,
    function(err){
      console.log(err|| 'connect-mongodb setup ok');
    }
  })
);


function dbConnect(){
mongoose.connect( process.env.DB_URL ,{
  useNewUrlParser:true,
  useUnifiedTopology:true,
  connectTimeoutMS: 10000,
})

.then( console.log("DB connected successfully") )

.catch((error)=>{ console.log("Error in connecting to DB")
            // console.log(error)
            // process. Exit(1)
           })
}

dbConnect();

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
    console.log(`Error in running the server:  ${err}`);
}
 console.log(`Server is running on the port : ${port}`);
});







