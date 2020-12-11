var express = require('express');
var router = express.Router();
const db = require('../config/database');


/* GET home page. */
router.get('/home', function (req, res, next) {
  res.render("home");
});
router.get('/', function (req, res, next) {
  res.render("register");
});

router.get("/homeGallery",(req, res, next) => {
  if(res.locals.logged)
    res.render("homeGallery", { title: "home Gallery" });
    else{
      res.send("You need to login in first");
    }
});

router.get("/imagePost", (req, res, next) => {
  res.render("imagePost", { title: "imagePost" });
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

// router.get("/getAllUsers", (req, res, next) => {
//   db.query('SELECT * FROM users', (err, results, fields) => {
//     console.log(results);
//     res.send(results);
//   });
// });
module.exports = router;
