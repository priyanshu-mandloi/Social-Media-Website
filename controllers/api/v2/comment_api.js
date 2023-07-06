module.exports.comment = function(req,res){
    return res.json(200,{
        message:"List of Comments",
        comment:[]
    });
}