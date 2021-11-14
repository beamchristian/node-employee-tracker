const db = require('./db/connection');

// display employee table
db.query(`SELECT * FROM Employee`, (err, rows) => {
  console.log(rows);
});
