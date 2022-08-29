// get the client
let mysql = require('mysql');

//create my sql connection pool
let conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'hirani4536',
    database: 'badminton',
    rowsAsArray: true
  })

  conn.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });
module.exports = conn