const nodemailer = require('../config/Nodemailer');


// this is another way of exporting a method
exports.resetPassword = async(user) => 
{
try{
    let htmlString = nodemailer.renderTemplate({user: user}, '/comments/password_reset.ejs');
    console.log('Inside resetPassword Mailer');
    const info = await new Promise((resolve, reject) => {
    nodemailer.transporter.sendMail
    (
        {
            from: 'priyanshumandloigurukul@gmail.com',
            to: user.emails,
            subject: "Reset Your Password",
            html: htmlString
        },
        (err, info) =>
        {
            if (err) {
                reject(err);
            } else {
                resolve(info);
            }
        });
});
}catch(err){
   console.log("Error due to send mails",err);
   return;
}
}