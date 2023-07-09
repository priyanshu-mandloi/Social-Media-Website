const { data } = require('jquery');
const nodemailer = require('nodemailer');
const path = require('path');
// Setting up the configuration to send the mail (i.e setting up the transporter).
const transporter = nodemailer.createTestAccount({
    service:"gmail",
    host:"smtp.gmail.com",
    port:587,
    secure:false,                                  
    auth:{
        user:"priyanshumandli999@gmail.com",
        pass:"pm#-@456"
    }
});

// Setting up the template to render it from views folder.
let renderTemplate = (data,relativePath)=>{
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname,'../views/mailers',relativePath),   // Relative Path is a place where this function is called
        data,
        function(err,template){
            if(err){
                console.log("error in rendering a template",err);
                return;
            }
             mailHTML = template;
        }
    )
    return mailHTML;
}

module.exports = {
    transporter:transporter,
    renderTemplate:renderTemplate
}