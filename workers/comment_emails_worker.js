// const queue = require('../config/Kue');

// // This will go inside the queue so we need to import it
// const commentsMailer  = require('../mailers/comments_mailer');

// // Here we have created the worker which will send us the mail not by using the controller.
// queue.process('emails',function(job,done){
//      console.log("Email worker is processing the jobs",job.data);
//      commentsMailer.newComment(job.data);
//      done();
// });