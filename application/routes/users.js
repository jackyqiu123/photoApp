var express = require('express');
var router = express.Router();
var db = require("../config/database");
const { errorPrint } = require('../helpers/debug/debugprinters');
const UserError = require('../helpers/error/UserError');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post('/register', (req, res, next) => {
  let username = req.body.username;
  let email = req.body.email;
  let password = req.body.createPassword;
  let confirmPw = req.body.confirmPassword;

  if (password != confirmPw) {
    res.redirect('/register');
  }
  else if (password == "" || username == "" || email == "" || confirmPw == "") {
    res.redirect('/register');
  }
  else {
    db.execute("SELECT * FROM users WHERE username = ?", [username], (err, results, fields) => {
      var count = 0;
      if (results && results.length == 0) { // nonexistent username
        count++;
      }
      db.execute("SELECT * FROM users WHERE email = ?", [email], (err, results, fields) => {
        if (results && results.length == 0) { // nonexistent email
          count++;
        }
        if (count == 2) { // if count = 2 means that both username and email is not taken 
          let insertNewUser = "INSERT INTO users (username, email, password, created) VALUES(?, ?, ?, now());";
          db.execute(insertNewUser, [username, email, password]);
          res.redirect('/login');
        }
        else { // if either username and email is taken, then registration is not going to be sucessful
          res.redirect('/register');
          console.log("username or email is already taken");
        }
      })

    })
  }
});

router.post('/login', (req, res, next) => {
  let username = req.body.username;
  let password = req.body.password;
  if (req.body.username == "" || req.body.password == "") {
    res.redirect('/login');
  }
  db.execute("SELECT * FROM users WHERE username = ?", [username], (err, results, fields) => {
    if (results && results.length > 0) { // checks if there's a matched username in the database
      // console.log(results[0].password);
      let matchedUserPw = results[0].password;
      if (matchedUserPw == password) {
        console.log(`${username} has successfully logged in`);
        res.redirect("/homeGallery");
      }
      else {
        console.log("username or password is incorrect");
        res.redirect("/login");
      }
    }
    else {
      console.log("username or password is incorrect");
      res.redirect("/login");
    }
  });
})
module.exports = router;