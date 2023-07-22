const mongoose = require("mongoose");
const enviornment = require('./enviornment');
mongoose.connect(`mongodb://localhost/${enviornment.db}`);

const db = mongoose.connection;

db.on('error',console.error.bind(console,"Error connecting to mongodb"));
db.once("open",function(){
    console.log("Conneted to Database :: mongodb");
});
module.exports=db;