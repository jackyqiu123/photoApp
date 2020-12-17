var express = require('express');
var router = express.Router();
const db = require('../config/database');

var getRecentPosts = require("../middleware/postsmiddleware").getRecentPosts;

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

router.get("/getPost/:id(\\d+)",(req, res,next)=>{
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

  res.send("comment button clicked");
})
module.exports = router;
