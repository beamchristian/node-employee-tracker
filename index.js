'use strict';
const db = require('./db/connection');
const inquirer = require('inquirer');
const cTable = require('console.table');
const { allowedNodeEnvironmentFlags } = require('process');
// inquirer init
promptQuestions();

function promptQuestions() {
  inquirer
    .prompt([
      {
        type: 'list',
        message: 'What would you like to do?',
        name: 'option',
        choices: [
          'View all Employees',
          'View all Employees By Department',
          'View all Roles',
          'Add Employee',
          'Add Role',
          'Add Department',
          'Update Employee role',
          'Remove Employee',
          'Quit',
        ],
      },
    ])
    .then(answer => {
      switch (answer.option) {
        case 'View all Employees':
          return viewEmployees();
        case 'View all Employees By Department':
          return viewDepartments();
        case 'View all Roles':
          return viewRoles();
        case 'Add Employee':
          return addEmployee();
        case 'Add Role':
          return addRole();
        case 'Add Department':
          return addDepartment();
        case 'Update Employee role':
          return updateRole();
        case 'Remove Employee':
          return removeEmployee();
        case 'Quit':
          return quit();
      }
    });
}

// view all employees
function viewEmployees() {
  db.query(`SELECT * FROM employee`, (err, result) => {
    if (err) throw err;
    console.log(`
    -------------------------------------------`);
    console.table(result);
  });
  promptQuestions();
}

function viewDepartments() {
  db.query(`SELECT * FROM department`, (err, result) => {
    if (err) throw err;
    console.log(`
    -------------------------------------------`);
    console.table(result);
  });
  promptQuestions();
}

function viewRoles() {
  db.query(
    `SELECT id, title, salary, department_id FROM roles`,
    (err, result) => {
      if (err) throw err;
      console.log(`
    -------------------------------------------`);
      console.table(result);
    }
  );
  promptQuestions();
}

function addEmployee() {
  let rolesArray = [
    'Sales Lead',
    'Salesperson',
    'Lead Engineer',
    'Software Engineer',
    'Account Manager',
    'Accountant',
    'Legal Team Lead',
    'Lawyer',
  ];

  return inquirer
    .prompt([
      {
        message: 'Choose an employee role',
        type: 'list',
        name: 'role',
        choices: rolesArray,
      },
      {
        message: 'Set the employees first name',
        type: 'input',
        name: 'firstName',
      },
      {
        message: 'Set the employees last name',
        type: 'input',
        name: 'lastName',
      },
    ])
    .then(answers => {
      db.query(
        `INSERT INTO employee SET ?`,
        {
          first_name: answers.firstName,
          last_name: answers.lastName,
          role_id: rolesArray.indexOf(answers.role) + 1,
        },

        (err, result) => {
          if (err) throw err;
        }
      );
      console.log(answers.role);
      promptQuestions();
    });
}

function addRole(role) {
  db.query(`INSERT INTO roles SET ?`, role, (err, result) => {
    if (err) throw err;
    console.log(`
    -------------------------------------------`);
    console.table(result);
  });
  promptQuestions();
}

function addDepartment(department) {
  db.query(`INSERT INTO department SET ?`, department, (err, result) => {
    if (err) throw err;
    console.log(`
    -------------------------------------------`);
    console.table(result);
  });
  promptQuestions();
}

function updateRole(employeeId, roleId) {
  db.query(
    `UPDATE employee SET role_id = ? WHERE id =?`,
    [roleId, employeeId],
    (err, result) => {
      if (err) throw err;
      console.log(`
    -------------------------------------------`);
      console.table(result);
    }
  );
  promptQuestions();
}

function quit() {
  process.exit();
}
