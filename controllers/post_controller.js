const Post = require('../models/posts');
const Comment = require('../models/comment');
const Like = require('../models/like');
module.exports.create = function(req, res) {
   Post.create({
    content: req.body.content,
    user: req.user._id 
  })
    .then(post => {
      if(req.xhr){
        return res.status(200).json({
          data:{
            post:post,
          },
          message:'Post created!'  
        });
      }
      req.flash('success','Post published!');
      return res.redirect('back');
    })
    .catch(err => {
      req.flash('error',err);
      return res.redirect('back');
    });
};


// To Delete the Post
module.exports.destroy = async function(req,res){
  await Post.findById(req.params.id)
    .then(async post => {
      if (!post) {
        return res.status(404).send("Post not found");
      }
      if(post.user.toString() === req.user.id) {
      
        // Delete the post likes with the deleting its comment likes too.
        await Like.deleteMany({likeable: post, onModel: 'Post'});
        await Like.deleteMany({_id: {$in: post.comments}});
        post.deleteOne();
        Comment.deleteMany({ post: req.params.id })
          .then(() => {
            if(req.xhr){
              return res.status(200).json({
                data:{
                  post_id:req.params.id
                },
                message:'Post deleted'
              });
            }

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