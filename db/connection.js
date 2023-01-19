const mysql = require('mysql2')
require ('dotenv').config()

const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      port: process.env.PORT,
      password: process.env.DB_PW,
      database: process.env.DB_NAME
    },
    console.log(`Connected to the employees_db database.`)
  );

  db.connect(function(err) {
    if (err) throw err
    console.log('database connected');
})

  module.exports = db;