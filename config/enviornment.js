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
            // pass:"evgxhvjzqxyevvbe"
            pass:"mnrn hzea eigw lvgn"
            // pass:"wkggzzxxokxxlvbv"
        }
    },
    //  client_ID: "955434243353-f6fihg550sqilp4qamb30i5si2f1emak.apps.googleusercontent.com",
    //  client_Secret: "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",
     client_ID: "1047240358642-b7iuo6u7o1g3m792du9mg6r3ojmbt3he.apps.googleusercontent.com",
     client_Secret: "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",
    
    //  callback_URL: "http://localhost:8000/users/auth/google/callback", 
     callback_URL: "https://avlanche.onrender.com/users/auth/google/callback", 
         
     jwtStrategy:"codeial",
     morgan:{
        mode:'dev',
        options:{stream:accessLogStream},
     },
     PORT:"5000", 
}
// const production = {
//     name:'production',
//     asset_path:process.env.Codeial_Asset_Path,
//     session_cookie_key: process.env.Codeial_Session_cookie_key,    // Key from the randomKeygen website.
//     // db:process.env.Codeial_db,
//     db:process.env.Codeial_db,
//     smtp:{
//         service:"Gmail",
//         host:"smtp.gmail.com",
//         port:587,
//         secure:true,                                
//         auth:{
//             user: process.env.Codeial_Gmail_Username,
//             pass:process.env.Codeial_Gmail_Password
//         }
//     },
//      client_ID: process.env.Codeial_client_ID ,
//      client_Secret: process.env.Codeial_client_secret,
//      callback_URL: process.env.Codeial_callback_URL, 
//      jwtStrategy:process.env.Codeial_JWTStrategy,  // Generated another key from the randomKeygen  website
//      morgan:{
//         mode:'combined',
//         options:{stream:accessLogStream},
//      }
// }
const production = {
    name: 'production',
    // asset_path: process.env.Codeial_Asset_Path,
    asset_path: "./public/assets",
    // session_cookie_key: process.env.Codeial_Session_cookie_key,
    session_cookie_key: "Vio7K5xDExRy0JOk2fgrgju6DeioOfAY",
    // db: process.env.Codeial_db,
    db: "codeial_production",
    smtp: {
        service: "Gmail",
        host: "smtp.gmail.com",
        port: 587,
        secure: false,  // Ensure this is false for TLS
        auth: {
            // user: process.env.Codeial_Gmail_Username,
            // pass: process.env.Codeial_Gmail_Password
            user: "priyashumandloi999@gmail.com",
            pass: "mnrn hzea eigw lvgn"
        }
    },
    // client_ID: process.env.Codeial_client_ID,
    // client_ID: "955434243353-f6fihg550sqilp4qamb30i5si2f1emak.apps.googleusercontent.com",
    // client_Secret: process.env.Codeial_client_Secret,
    // client_Secret: "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",
    // callback_URL: process.env.Codeial_callback_URL,
    client_ID: "1047240358642-b7iuo6u7o1g3m792du9mg6r3ojmbt3he.apps.googleusercontent.com",
    client_Secret: "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",
    callback_URL: "https://avlanche.onrender.com/users/auth/google/callback", 
    // callback_URL:  "http://localhost:8000/users/auth/google/callback",
    // jwtStrategy: process.env.Codeial_JWTStrategy,
    jwtStrategy: "hyHm5HzGh3JYvUEzNxiyR8qnm9eJT2oe",
    morgan: {
        mode: 'combined',
        options: { stream: accessLogStream },
    }
};


// module.exports = eval(process.env.Codeial_enviornment)==undefined?devlopment :eval(process.env.Codeial_enviornment) ;                             // Exported the right function
module.exports = eval("production")==undefined?devlopment :eval("production") ;                             // Exported the right function


