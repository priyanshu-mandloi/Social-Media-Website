module.exports.profile=function(req,res){
    // return res.end('<h1>Profile!</h1>');
    return res.render('users',{
        title:"Users"
    });
}