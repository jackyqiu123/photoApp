const mysql = require("mysql2");


const pool = mysql.createPool({
    connectionLimit: 50,
    host: "localhost",
    user: "root",
    password: "duckgoose",
    database: "csc317db",
    debug: false

});
const promisePool = pool.promise();

module.exports = promisePool;