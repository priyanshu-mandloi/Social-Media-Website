const Comment = require("../models/comment");
const Post = require("../models/posts");

module.exports.create = async function(req, res) {
  try {
    const post = await Post.findById(req.body.Post);
    // console.log(req.body);
    if (post) {
      const createdComment = await Comment.create({
        content: req.body.content,
        post: req.body.post,
        user: req.user._id
    });
      post.comments.push(createdComment);
      await post.save();
      res.redirect('/');
    } 
  }catch (err) {
    console.error(err);
  }
};
