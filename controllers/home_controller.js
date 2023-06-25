const Post = require('../models/posts');

module.exports.home = async function(req,res){
    try{
        // Populate the user of each post.
     const posts = await Post.find({})
     .populate('user').
     populate({
        path:'comments',
        populate:{
            path:'user'
        }
     }).exec();
     const postArray = Array.isArray(posts) ? posts : [];
     console.log(postArray);
       return res.render('home',{
          title:'Codeial | Home',
          posts:postArray
        }); 
    }catch(err){
        console.error(err);
    }
}

// module.exports.actionName = function(req,res){
//     return res.end('<h1>HELLO!</h1>');
// }