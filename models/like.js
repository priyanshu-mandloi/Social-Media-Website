const mongoose = require('mongoose');
// Creating a schema for the likes

const likeSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.ObjectId,
    },
    // this object is defined for the liked object that is on comment or post
    likeable:{
        type:mongoose.Schema.ObjectId,
        require:true,
        refPath:'onModel'
    },
    // this is the  filed which is defined for the type of the likeable object since this is a dynamic reference.
    onModel:{
       type:String,
       required:true,
       enum:['Post', 'Comment']            // This will ensure that only Post and comments can have the likes here.
    }
},{
    timestamps:true
});

const Like = mongoose.model('Like',likeSchema);
module.exports = Like;

