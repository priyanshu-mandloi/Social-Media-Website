const Comment = require("../models/comment");
const Post = require("../models/posts");

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
    res.redirect('/');
  } 
  }catch (err) {
    console.error(err);
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
      return res.redirect('back');
    } else {
      return res.redirect('back');
    }
  } catch (err) {
    console.log("Error in deleting comment:", err);
    return res.status(500).send("Error in deleting comment");
  }
};
