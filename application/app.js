var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var handlebars = require("express-handlebars");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var errorPrint = require("./helpers/debug/debugprinters").errorPrint;
var requestPrint = require("./helpers/debug/debugprinters").requestPrint;

var sessions = require("express-session");
var mysqlSession = require("express-mysql-session")(sessions);


var app = express();

app.engine(
    "hbs",
    handlebars({
        layoutsDir: path.join(__dirname, "views/layouts"),
        partialsDir: path.join(__dirname, "views/partials"),
        extname: ".hbs",
        defaultLayout: "home",
        helpers: {
            // if need helpers, write them here.
        }

    })
);
var mysqlSessionStore = new mysqlSession(
    {
        /* using default options*/
    },
    require("./config/database")
);
app.use(sessions({
    key: "csid",
    secret: "this is a secret from csc317",
    store: mysqlSessionStore,
    resave: false,
    saveUnititialized: false
}));


app.set("view engine", "hbs");

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/public", express.static(path.join(__dirname, 'public')));
app.use((req, res, next) => {
    requestPrint(req.url);
    next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use((err, req, res, next) => {
    res.render('error', { err_message: err });
});
module.exports = app;
