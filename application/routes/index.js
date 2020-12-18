var express = require('express');
var router = express.Router();
const db = require('../config/database');

var getRecentPosts = require("../middleware/postsmiddleware").getRecentPosts;
var getComments = require("../middleware/commentsmiddleware").getComments;

/* GET home page. */
router.get('/home', function (req, res, next) {
  res.render("home");
});
router.get('/', function (req, res, next) {
  res.render("register");
});

router.get("/homeGallery",getRecentPosts, (req, res, next) => {
  if(res.locals.logged)
    res.render("homeGallery", { title: "home Gallery"});
    else{
      res.send("You need to login in first");
    }
});

router.get("/imagePost", (req, res, next) => {
  if(res.locals.logged)
    res.render("imagePost", { title: "Image Post" });
  else
  res.send("You need to login in first");
});

router.get("/postImage", (req, res, next) => {
  if(res.locals.logged)
    res.render("postImage", { title: "Post Image" });
    else{
      res.send("You need to login in first to post");
    }
});
router.get("/register", (req, res, next) => {
  res.render("register", { title: "register" });
});
router.get("/login", (req, res, next) => {
  res.render("login", { title: "login" });
});

router.get("/getPost/:id(\\d+)", getComments, (req, res,next)=>{
  let baseSQL = "SELECT p.id,u.username, p.title, p.description, p.photopath, p.created\
  FROM users u\
  JOIN posts p\
  ON u.id = fk_userid\
  where p.id = ?;";
  let postId = req.params.id;
  db.execute(baseSQL, [postId])
  .then(([results, fields])=>{
    if(results && results.length){
      let post = results[0];
      res.render("imagePost",{currentPost:post});
    }
    else{
      req.flash("error","This is not the post you are looking for!");
      res.redirect("/homeGallery");
    }
  })
})
router.post("/getPost/:id(\\d+)", (req, res, next)=>{
  let comment = req.body.comment;
  let postid = req.params.id;
  let userid = req.session.userId;

  if(!comment){
    req.flash("error", "Comment was blank");
    res.redirect(`/getPost/${postid}`)
  }
  else{
    let baseSQL = `INSERT INTO comments(comment, fk_postid, fk_authorid) VALUES(?,?,?)`;
    db.execute(baseSQL, [comment, postid, userid])
    .then(([results, fields])=>{
      if(results && results.affectedRows){
        req.flash("success", "Comment successfully made");
        res.redirect(`/getPost/${postid}`)
      } 
      else{
        req.flash("error", "Comment could not be made");
      }    
    })
    .catch(err => res.send(err));
  }
})
module.exports = router;
