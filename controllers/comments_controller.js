const Comment = require("../models/comment");
const Post = require("../models/posts");
const commentMailer = require('../mailers/comments_mailer.js');
const queue = require('../config/Kue');
const commentEmailWorker = require('../workers/comment_emails_worker');

module.exports.create = async function(req, res) {
  try {
    const post = await Post.findById(req.body.post);
    if(post) { 
      let comment= await Comment.create({
        content: req.body.content,
        post: req.body.post,
        user: req.user._id
    });
    post.comments.push(comment);
    await post.save();
    
    // populate the user every time
    comment = await Comment.findById(comment._id).populate('user','name emails').lean();
    // commentMailer.newComment(comment);
    let job = queue.create('emails',comment).save(function(err){
      if(err){
        console.log("Error in sending to the queue",err);
        return;
      }
      console.log("Job enqued",job.id);
    });
    console.log("Created a content:",comment);
   
   if(req.xhr){
      return res.status(200).json({
        data:{
          // comment_id:req.params.id
          comment:comment
        },
        message:'Comment Created'
      });
    }
    req.flash('success','Comment published!');
    res.redirect('/');
  } 
  }catch (err) {
    // req.flash('error',err);
    console.log("Error in create code",err);
    return res.redirect('back');
  }
};

// Deleting a comment
module.exports.destroy = async function(req, res) {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      return res.status(404).send("Comment not found");
    }
    if (comment.user.toString() === req.user.id) {
      let postId = comment.post;
      await comment.deleteOne();
      await Post.findByIdAndUpdate(postId, { $pull: { comments: req.params.id } });
      if(req.xhr){
        return res.status(200).json({
          data:{
            comment_id:req.params.id
          },
          message:'Comment Deleted'
        });
      }
      req.flash('success','Comment is Deleted!');
      return res.redirect('back');
    } else {
      return res.redirect('back');
    }
  } catch (err) {
    req.flash('error',err);
    return res.status(500).send("Error in deleting comment");
  }
};
