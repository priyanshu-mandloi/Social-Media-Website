const express = require("express");
const app = express();
const port =  8000;

// use express router
app.use('/',require('./routes'));

// for set up view engine.
app.set('view engine',ejs);
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