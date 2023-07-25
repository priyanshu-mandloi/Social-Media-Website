// All comments related mails will be present here
const nodemailer = require('../config/Nodemailer');

exports.newComment = async (comment) => {
    try {
        let htmlString  = nodemailer.renderTemplate({comment:comment},'/comments/new_comment.ejs');
        // console.log("Inside newcomment mailer", comment);
        const info = await new Promise((resolve, reject) => {
            nodemailer.transporter.sendMail({
                from: "priyanshumandloigurukul@gmail.com",
                to: comment.user.emails,
                subject: "New Comment Published!",
                html: htmlString
            }, (err, info) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(info);
                }
            });
        });
        // console.log('Message sent', info);
    } catch (err) {
        console.log('Error in delivering the mail', err);
    }
};


