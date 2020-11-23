var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render("index");
});

router.get("/home", (req, res, next) => {
  res.render("home", { title: "home" });
});

router.get("/imagePost", (req, res, next) => {
  res.render("imagePost", { title: "imagePost" });
});

router.get("/postImage", (req, res, next) => {
  res.render("postImage", { title: "postImage" });
});
router.get("/register", (req, res, next) => {
  res.render("register", { title: "register" });
});
router.get("/login", (req, res, next) => {
  res.render("login", { title: "login" });
});
module.exports = router;
