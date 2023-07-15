const Like = require('../models/likes');
const Post = require('../models/posts');
const Comment = require('../models/comment');

module.exports.toggleLike = async function(req,res){
    try{

            // url will be shaped as --> likes/toggle/?id=abcdef&type=POST
            let likeable;
            let deleted = false;
            if(req.query.type=='Post'){
                // inside the Post
                    likeable = await Post.findById(req.query.id).populate('likes');
            }else{
                // it means we are in the comments
                likeable = await Comment.findById(req.query.id).populate('likes');
            }
            console.log("Query",req.query);
            // Checking if the Likes are already present than delete the likes
            const existingLike = await Like.findOne({
                user:req.user._id,
                likeable:req.query.id,
               onModel:req.query.type
            });
            console.log("Print the Existing like :", existingLike);
            if(existingLike){
                // if the like exist than we will simply delete it
                likeable.likes.pull(existingLike._id);
                likeable.save();
                existingLike.deleteOne();
                deleted = true;
            }else{
                // Make a new like
                let newLike = await Like.create({
                   user:req.user._id,
                   likeable:req.query._id,
                   onModel:req.query.type,
                });

                // Pushing the like to database
                // likeable.likes.push(like._id);
                likeable.likes.push(newLike._id);
                likeable.save();

            }
            console.log("Printing the deleted",deleted);
        return res.status(200).json({
            message:"Request Successful",
            data:{
                deleted:deleted
            }
        })    
        
    }catch(err){
     console.log("Error in liking Post!",err);
     return res.status(500).json({
        message:"Internal Server Error!"
     });
    }
}