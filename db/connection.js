const mysql = require('mysql2')

require('dotenv').config();

const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      port: 3306,
      password: 'Beltre!1986',
      database: 'employees_db'
    },
    console.log(`Connected to the employees_db database.`)
  );

  db.connect(function(err) {
    if (err) throw err
    console.log('database connected');
})

  module.exports = db;