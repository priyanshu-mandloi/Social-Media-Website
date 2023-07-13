const nodemailer = require('../config/Nodemailer');


// this is another way of exporting a method
exports.resetPassword = (user) => 
{
    let htmlString = nodemailer.renderTemplate({user: user}, '/users/password_reset.ejs');
    console.log('Inside resetPassword Mailer');

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
            if(err)
            {
                console.log('Error in sending mail', err);
                return;
            }
            //console.log('Message sent', info);
            return;
        }
    );
}