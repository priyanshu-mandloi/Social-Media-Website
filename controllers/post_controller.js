const Post = require('../models/posts');

module.exports.create = function(req, res) {
  console.log(req.body);
  console.log(req.user);
  
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
