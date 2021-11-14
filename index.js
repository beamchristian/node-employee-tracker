const db = require('./db/connection');

// display employee table
// db.query(`SELECT * FROM Employee`, (err, rows) => {
//   console.log(rows);
// });

// Get a single employee
// db.query(`SELECT * FROM Employee WHERE id = 1`, (err, row) => {
//   if (err) {
//     console.log(err);
//   }
//   console.log(row);
// });

// Delete a Employee
// db.query(`DELETE FROM Employee WHERE id = ?`, 10, (err, result) => {
//   if (err) {
//     console.log(err);
//   }
//   console.log(result);
// });

// Create a Employee
// const sql = `INSERT INTO Employee (id, first_name, last_name, role_id, manager_id)
//               VALUES (?,?,?,?,?)`;
// const params = [10, 'Jim', 'Beam', 1, 2];

// db.query(sql, params, (err, result) => {
//   if (err) {
//     console.log(err);
//   }
//   console.log(result);
// });
