const Comment = require("../models/comment");
const Post = require("../models/posts");
const commentsMailer = require('../mailers/comments_mailer');

module.exports.create = async function(req, res) {
  try {
    const post = await Post.findById(req.body.post);
    if(post) {
      const createdComment= await Comment.create({
        content: req.body.content,
        post: req.body.post,
        user: req.user._id
    });
    console.log("Created a content:",createdComment);
    post.comments.push(createdComment);
    await post.save();
   // populate the user every time
   comment = await comment.populate('user','name emails').execPopulate();
   commentsMailer.newComment(comment);
    if(req.xhr){
      return res.status(200).json({
        data:{
          comment_id:req.params.id
        },
        message:'Comment Created'
      });
    }
    req.flash('success','Comment published!');
    res.redirect('/');
  } 
  }catch (err) {
    req.flash('error',err);
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
