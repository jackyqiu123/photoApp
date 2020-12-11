var express = require('express');
var router = express.Router();
var db = require("../config/database");
const { errorPrint, successPrint } = require('../helpers/debug/debugprinters');
const UserError = require('../helpers/error/UserError');
var bcrypt = require("bcrypt");

// /* GET users listing. */
// router.get('/', function (req, res, next) {
//   res.send('respond with a resource');
// });

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
    db.execute("SELECT * FROM users WHERE username=?", [username])
      .then(([results, fields]) => {
        if (results && results.length == 0) {
          return db.execute("SELECT * FROM users WHERE email=?", [email]);
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
          bcrypt.hash(password, 15, (err, hash) => {
            let insertNewUser = "INSERT INTO users (username, email, password, created) VALUES(?, ?, ?, now());";
            db.execute(insertNewUser, [username, email, hash]);
          })
          successPrint("user was created");
          req.flash("success", "User account has been made!");
          res.redirect("/login");
        }
        else {
          throw new UserError(
            "Registration Failed: Email is already taken",
            "/register",
            200
          );
        }
      })
      .catch((err) => {
        errorPrint("user could not be made", err);
        if (err instanceof UserError) {
          errorPrint(err.getMessage());
          req.flash("error",err.getMessage());
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
    let selectSQL = "SELECT id,username, password FROM users WHERE username= ?;";
    let userId;
    db.execute(selectSQL, [username])
      .then(([results, fields]) => {
        if(results.length == 0){
          throw new UserError(
            "Log in credentials does not match any users in our system",
            "/login",
            200
          );
        }
        userId = results[0].id;
        if (results && results.length == 1) {
          let hashedPW = results[0].password;
          return bcrypt.compare(password, hashedPW);
        }
      })
      .then((matched) => {
        if (matched) {
          successPrint(`${username} has successfully logged in`);
          req.session.username = username;
          req.session.userId = userId;
          res.locals.logged = true;
          req.flash("success", "You have successfully logged in");
          res.redirect("/homeGallery");
        }
        else {
          throw new UserError(
            "log in credentials does not match any users in our system",
            "/login",
            200
          );
        }
      })
      .catch(err => {
        errorPrint("user login failed");
        if (err instanceof UserError) {
          errorPrint(err.getMessage());
          res.status(err.getStatus());
          req.flash("error",err.getMessage());
          res.redirect(err.getRedirectURL());
        }
        else {
          next(err);
        }
      })
  }
});

router.post('/logout', (req, res, next) => {
  req.session.destroy((err) => {
    if (err) {
      errorPrint("session could not be destroyed");
      next(err);
    }
    else {
      res.locals.logged = false;
      successPrint("session was destroyed");
      res.clearCookie("csid");
      res.json({ status: "OK", message: "user is logged out" });
    }
  })
});

module.exports = router;

