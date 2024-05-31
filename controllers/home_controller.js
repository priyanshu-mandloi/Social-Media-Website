const Post = require('../models/posts');
const User = require('../models/users');
const Friendship = require('../models/friendship');
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
     .populate('likes')
     .exec();
     
     const users = await User.find({}).exec();
     
     let friends = new Array();
   if (req.user)/* friends list will only be loaded if thhe user is signed in */
    {
       let all_friendships = await Friendship.find({ $or: [{ from_user: req.user._id }, { to_user: req.user._id }] })
           .populate('from_user')
           .populate('to_user');/* checking the friendship model in the fields "from user" and "to_user". the current logged in user has to be in one of them. and at the same time we are also populating it to see the user ids*/

       for (let fs of all_friendships)/* storing all the friendships in an array so that it is easy to load them in the front end quickly */
       {
           if (fs.from_user._id.toString() == req.user._id.toString())
           {
               friends.push({
                   friend_name: fs.to_user.name,
                   friend_id: fs.to_user._id,
               });
           }
           else if (fs.to_user._id.toString() == req.user._id.toString())
           {
               friends.push({
                   friend_name: fs.from_user.name,
                   friend_id: fs.from_user._id,
               });
           }
       }
   }


     if(users){        
      const postArray = Array.isArray(posts) ? posts : [];
      // console.log(postArray);
      return res.render('home',{
        title:'Avlanche | Home',
        posts:postArray,
             all_users:users,
             friends:friends
           });  
    }
    
    }catch(err){
        console.error(err);
    }
}

