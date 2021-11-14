const db = require('./db/connection');
const inquirer = require('inquirer');
const cTable = require('console.table');

// display employee table

const promptQuestions = () => {
  return inquirer
    .prompt({
      type: 'list',
      choices: [
        'View all Employees',
        'View all Employees By Department',
        'Add Employee',
        'Add Role',
        'Add Department',
        'Update Employee role',
        'Remove Employee',
        'Quit',
      ],
      message: 'What would you like to do?',
      name: 'option',
    })
    .then(answer => {});
};

// view all employees
function viewEmployees() {
  db.query(`SELECT * FROM employee`, (err, result) => {
    if (err) throw err;
    console.table(result);
  });
}

function viewDepartments() {
  db.query(`SELECT * FROM department`, (err, result) => {
    if (err) throw err;
    console.table(result);
  });
}

function viewRole() {
  db.query(`SELECT * FROM roles`, (err, result) => {
    if (err) throw err;
    console.table(result);
  });
}

// function calls
// viewDepartments();
// viewRole();

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
