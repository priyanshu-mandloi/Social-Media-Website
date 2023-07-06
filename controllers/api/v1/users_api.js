const User = require('../../../models/users');
const jwt = require('jsonwebtoken');
module.exports.createSession= async function(req,res){ 
  try{
      let user = await User.findOne({emails:req.body.emails}); 
       if(!user|| user.password!=req.body.password){
        return res.status(422).json({
            message:"Invalid username and password"
        });
       }
       return res.json(200,{
           message:"Sign in successfully here is your token keep it safe!",
           data:{
            token:jwt.sign(user.toJSON(),'codeial',{expiresIn: '10000'})
           }
       });
  }catch(err){
    console.log('*******',err);
    return res.status(500).json({
        message:"Internal Server Error!"
    });
}
 }