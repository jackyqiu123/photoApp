var db = require("../config/database");
const commentMiddleware = {};

commentMiddleware.getComments = function(req,res,next){
    let postId = req.params.id;
    let baseSQL = "SELECT u.username, c.comment, c.created, c.id\
    FROM comments c\
    JOIN users u\
    on u.id = fk_authorid\
    WHERE c.fk_postid = ?\
    ORDER BY c.created ASC";
    db.execute(baseSQL,[postId])
    .then(([results,fields])=>{
       if(results && results.length){
           res.locals.results = results;
       }
       else if(results && results.length == 0){
        req.flash("error", "There are no comments yet");
       }
        next();
    })
    .catch(err => next(err));
}
module.exports = commentMiddleware;