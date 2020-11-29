var express = require('express');
var router = express.Router();
var db = require("../config/database");
const { errorPrint } = require('../helpers/debug/debugprinters');
const UserError = require('../helpers/error/UserError');
var bcrypt = require("bcrypt");

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
  // else {
  //   db.execute("SELECT * FROM users WHERE username = ?", [username], (err, results, fields) => {
  //     var count = 0;
  //     if (results && results.length == 0) { // nonexistent username
  //       count++;
  //     }
  //     db.execute("SELECT * FROM users WHERE email = ?", [email], (err, results, fields) => {
  //       if (results && results.length == 0) { // nonexistent email
  //         count++;
  //       }
  //       if (count == 2) { // if count = 2 means that both username and email is not taken 
  //         bcrypt.hash(password, 15, (err, hash) => {
  //           let insertNewUser = "INSERT INTO users (username, email, password, created) VALUES(?, ?, ?, now());";
  //           db.execute(insertNewUser, [username, email, hash]);
  //         })
  //         res.redirect("/login");
  //       }
  //       else { // if either username and email is taken, then registration is not going to be sucessful
  //         res.redirect('/register');
  //         console.log("username or email is already taken");
  //       }
  //     })

  //   })

  // }
  else {
    db.execute("SELECT * FROM users WHERE username=?", [username])
      .then(([results, fields]) => {
        if (results && results.length == 0) {
          // return db.execute("SELECT * FROM users WHERE email=?", [email]);
          console.log("hello");
        }
        else {
          throw new UserError(
            "Registration Failed: Username is already taken",
            "/register",
            200
          );
        }
      })
      .then(([results, fields]) => {
        if (results && results.length == 0) {
          let insertNewUser = "INSERT INTO users (username, email, password, created) VALUES(?, ?, ?, now());";
          return db.execute(insertNewUser, [username, email, password]);
        }
        else {
          throw new UserError(
            "Registration Failed: Email is already taken",
            "/register",
            200
          );
        }
      })
      .then(([results, fields]) => {
        if (results && results.affectedRows) {
          successPrint("user was created");
          res.redirect('/login');
        }
        else {
          throw new UserError(
            "Server Error, user could not be created",
            "/register",
            200
          );
        }
      })
      .catch((err) => {
        errorPrint("user could not be made", err);
        if (err instanceof UserError) {
          errorPrint(err.getMessage());
          res.status(err.getStatus());
          res.redirect(err.getRedirectURL());
        }
        else {
          next(err);
        }
      });
  }
});

router.post('/login', (req, res, next) => {
  let username = req.body.username;
  let password = req.body.password;
  if (username == "" || password == "") {
    res.redirect('/login');
  }
  else {
    db.execute("SELECT * FROM users WHERE username = ?", [username], (err, results, fields) => {
      let userId = results[0].id;
      if (results && results.length > 0) { // check if there's a matched username in the database
        let hashedPw = results[0].password;
        bcrypt.compare(password, hashedPw, (matched) => {
          if (matched) {
            console.log(`${username} has successfully logged in`);
            req.sessions.username = username;
            req.sessions.id = userId;
            res.redirect("/homeGallery");
          }
          else {
            console.log("username or password is incorrect");
            res.redirect("/login");
          }
        })
      }
      else { // username is typed incorrect or does not exist
        res.redirect("/login");
      }
    });
  }

})
module.exports = router;