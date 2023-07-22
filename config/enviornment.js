const fs = require('fs');
const rfs = require('rotating-file-stream');
const path = require('path');
const logDirectory = path.join(__dirname,'../production-log');
fs.existsSync(logDirectory||fs.mkdirSync(logDirectory));

const accessLogStream = rfs.createStream('access.log',{
  interval:'1d',
  path:logDirectory
});

const devlopment ={
    name:'devlopment',
    asset_path:'./assets',
    session_cookie_key:'blahsomething',
    db:'codeial_devlopment',
    smtp:{
        service:"Gmail",
        host:"smtp.gmail.com",
        port:587,
        secure:false,                                
        auth:{
            user:"priyashumandloi999@gmail.com",
            pass:"evgxhvjzqxyevvbe"
            // pass:"wkggzzxxokxxlvbv"
        }
    },
     client_ID: "955434243353-f6fihg550sqilp4qamb30i5si2f1emak.apps.googleusercontent.com",
     client_Secret: "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",
     callback_URL: "http://localhost:8000/users/auth/google/callback", 
     jwtStrategy:"codeial",
     morgan:{
        mode:'dev',
        options:{stream:accessLogStream},
     }
     
}
const production = {
    name:'production',
    asset_path:process.env.Codeial_Asset_Path,
    session_cookie_key: process.env.Codeial_Session_cookie_key,    // Key from the randomKeygen website.
    // db:process.env.Codeial_db,
    db:process.env.Codeial_db,
    smtp:{
        service:"Gmail",
        host:"smtp.gmail.com",
        port:587,
        secure:false,                                
        auth:{
            user: process.env.Codeial_Gmail_Username,
            pass:process.env.Codeial_Gmail_Password
        }
    },
     client_ID: process.env.Codeial_client_ID ,
     client_Secret: process.env.Codeial_client_secret,
     callback_URL: process.env.Codeial_callback_URL, 
     jwtStrategy:process.env.Codeial_JWTStrategy,  // Generated another key from the randomKeygen  website
     morgan:{
        mode:'combined',
        options:{stream:accessLogStream},
     }
}

module.exports = eval(process.env.Codeial_enviornment)==undefined?devlopment :eval(process.env.Codeial_enviornment) ;                             // Exported the right function