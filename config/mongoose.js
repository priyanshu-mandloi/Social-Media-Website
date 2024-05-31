const mongoose = require("mongoose");
require("dotenv").config();
const enviornment = require('./enviornment');

mongoose.connect(process.env.DB_URL);
const db = mongoose.connection;

db.on('error',console.error.bind(console,"Error connecting to mongodb"));
db.once("open",function(){
    console.log("Conneted to Database :: mongodb");
});
module.exports=db;


//  module.exports.db = () =>{

//     mongoose.connect( process.env.DB_URL , {
//             useNewUrlParser:true,
//             useUnifiedTopology:true,
//             connectTimeoutMS: 10000,
//     } )
    
//     .then( console.log("DB connected ") )
    
//     .catch((error)=>{ console.log("Error in connecting to DB")
//                       console.log(error)
//                       process. Exit(1) })
    
//     }