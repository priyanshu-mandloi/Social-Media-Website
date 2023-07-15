const Post = require('../models/posts');
const User = require('../models/users');

module.exports.home = async function(req,res){
    try{
        // Populate the user of each post.
     const posts = await Post.find({})
     .sort('-createdAt')
     .populate('user').
     populate({
        path:'comments',
        populate:{
            path:'user'
        },
      populate :{
        //   This is for the comments
          path: 'likes'
        }
     })
    //  This is for the posts
     .populate('likes')
     .exec();
    const users = await User.find({}).exec();
    if(users){        
        const postArray = Array.isArray(posts) ? posts : [];
        // console.log(postArray);
          return res.render('home',{
             title:'Codeial | Home',
             posts:postArray,
             all_users:users
           });  
    }
    }catch(err){
        console.error(err);
    }
}

