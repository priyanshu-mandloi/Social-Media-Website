const Post = require('../models/posts');
const Comment = require('../models/comment');

module.exports.create = function(req, res) {
  Post.create({
    content: req.body.content,
    user: req.user._id 
  })
    .then(post => {
      return res.redirect('back');
    })
    .catch(err => {
      console.log("Error in creating a post:", err);
      return res.status(500).send("Error in creating a post");
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
            return res.redirect('back');
          })
          .catch(err => {
            console.log("Error in deleting comments:", err);
            return res.status(500).send("Error in deleting comments");
          });
      } else {
        res.redirect('back');
      }
    })
    .catch(err => {
      console.log("Error in finding post:", err);
      return res.status(500).send("Error in finding post");
    });
};