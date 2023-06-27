const Post = require('../models/posts');
const Comment = require('../models/comment');

module.exports.create = function(req, res) {
  Post.create({
    content: req.body.content,
    user: req.user._id 
  })
    .then(post => {
      req.flash('success','Post published!');
      return res.redirect('back');
    })
    .catch(err => {
      req.flash('error',err);
      return res.redirect('back');
    });
};


// To Delete the Post
module.exports.destroy = function(req,res){
  Post.findById(req.params.id)
    .then(post => {
      if (!post) {
        return res.status(404).send("Post not found");
      }
      if(post.user.toString() === req.user.id) {
        post.deleteOne();
        
        Comment.deleteMany({ post: req.params.id })
          .then(() => {
            req.flash('success','Post and associated comments gets deleted!');
            return res.redirect('back');
          })
          .catch(err => {
            console.log("Error in deleting comments:", err);
            return res.status(500).send("Error in deleting comments");
          });
      } else {
        req.flash('error','You can not delete this post!');
        res.redirect('back');
      }
    })
    .catch(err => {
      req.flash('error',err);
      return res.redirect('back');
    });
};