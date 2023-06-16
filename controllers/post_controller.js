module.exports.posts=function(req,res){
    // return res.end("<h1>Posts!</h1>");
    return res.render('post',{
        title:"Posts"
    });
}