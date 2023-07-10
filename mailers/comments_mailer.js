// All comments related mails will be present here
const nodemailer = require('../config/Nodemailer');

exports.newComment = async (comment) => {
    try {
        console.log("Inside newcomment mailer", comment);
        const info = await new Promise((resolve, reject) => {
            nodemailer.transporter.sendMail({
                from: "priyashumandloi999@gmail.com",
                to: comment.user.emails,
                subject: "New Comment Published!",
                html: "<h1>Yup, your comment is now Published</h1>"
            }, (err, info) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(info);
                }
            });
        });
        console.log('Message sent', info);
    } catch (err) {
        console.log('Error in delivering the mail', err);
    }
};