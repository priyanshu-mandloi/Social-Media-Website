const nodemailer = require('../config/Nodemailer');

// this is another way of exporting a method
exports.resetPassword = async(user) => 
{
    // console.log(user.email);
try{
    let htmlString = nodemailer.renderTemplate({user: user}, '/comments/password_reset.ejs');
    // console.log('Inside resetPassword Mailer');
    const info = await new Promise((resolve, reject) => {
    nodemailer.transporter.sendMail
    (
        {
            from: 'priyashumandloi999@gmail.com',
            to: user.email,
            // to:'priyanshumandloigurukul@gmail.com',
            subject: "Reset Your Password",
            html: htmlString,
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
