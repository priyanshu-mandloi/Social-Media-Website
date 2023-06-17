const express = require("express");
const cookieParser = require('cookie-parser');
const port =  8000;
const app = express();
var expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
app.use(express.urlencoded()); 
app.use(cookieParser());
app.use(express.static('./assets')); 
app.use(expressLayouts);
// use express router
app.use('/',require('./routes'));

app.set('layout extractStyles',true);
app.set('layout extractScripts',true);
// for set up view engine.
app.set('view engine','ejs');
app.set('views','./views');

app.listen(port,function(err){
 if(err){
    // Normal way
    // console.log("Error :",err);
    // By interpolation method (use the tick)
    console.log(`Error in running the server:  ${err}`);
}

 console.log(`Server is running on the port : ${port}`);
});