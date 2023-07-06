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
    return res.json(200,{
       message:'List of Post',
       posts:posts
    });
}

// module.exports.destroy =  async function(req,res){
   
//    try{
//         let post = await Post.findById(req.params.id); 
//           post.deleteOne();
//         await  Comment.deleteMany({ post: req.params.id });
//          return res.json(200,{
//            message:"Post and associated comments get deleted!"
//          });
//     }catch(err){
//         console.log("Error",err);
//         return res.json(500,{
//             message:"Internal Server Error!"
//         });
//     }
// }

module.exports.destroy = function(req,res){
    Post.findById(req.params.id)
      .then(post => {
        
          post.deleteOne();
          
          Comment.deleteMany({ post: req.params.id })
          return res.json(200,{
            message:"Post and associated comments get deleted!"
          }); 
      })
      .catch(err => {
       console.log('*******',err);
        return res.json(500,{
            message:"Internal Server Error!"
        });
      });
  };