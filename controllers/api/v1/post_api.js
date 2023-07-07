const { post } = require('jquery');
const Post = require('../../../models/posts');
const Comment = require('../../../models/comment');

module.exports.index = async function(req,res){
    
    const posts = await Post.find({})
     .sort('-createdAt')
     .populate('user').
     populate({
        path:'comments',
        populate:{
            path:'user'
        }
     }).exec();
    return res.status(200).json({
       message:'List of Post',
       posts:posts
    });
}

// module.exports.destroy =  async function(req,res){
   

module.exports.destroy = async function(req, res) {
  try {
       let post = await Post.findById(req.params.id);
      if (!post) {
          return res.status(404).json({
              message: "Post not found!"
          });
      }

      if (post.user.toString() ==  req.user.id) {
          await post.deleteOne();
          await Comment.deleteMany({ post: req.params.id });

          return res.status(200).json({
              message: "Post and associated comments deleted!"
          });
      } else {
          return res.status(401).json({
              message: "You cannot delete this post!"
          });
      }
  } catch (err) {
      console.log(err);
      return res.status(500).json({
          message: "Internal Server Error!"
      });
  }
};