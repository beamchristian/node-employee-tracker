const mysql = require('mysql2');
const express = require('express');

const PORT = process.env.PORT || 3001;
const app = express();

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // Your MySQL username,
    user: 'root',
    // Your MySQL password
    password: 'Sharon13.!',
    database: 'employeetracker',
  },
  console.log('Connected to the employeetracker database.')
);

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Get all employees
app.get('/api/employee', (req, res) => {
  const sql = `SELECT employee.*, roles.title 
               AS title, 
               roles.salary 
               AS salary
               FROM employee
               LEFT JOIN roles ON employee.role_id = roles.id`;

  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: rows,
    });
  });
});

// GET a single employee
app.get('/api/employee/:id', (req, res) => {
  const sql = `SELECT employee.*, roles.title 
               AS title, 
               roles.salary 
               AS salary
               FROM employee
               LEFT JOIN roles
               ON employee.role_id = roles.id
               WHERE employee.id = ?`;
  const params = [req.params.id];

  db.query(sql, params, (err, row) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: row,
    });
  });
});

// Delete a employee
app.delete('/api/employee/:id', (req, res) => {
  const sql = `DELETE FROM employee WHERE id = ?`;
  const params = [req.params.id];

  db.query(sql, params, (err, result) => {
    if (err) {
      res.statusMessage(400).json({ error: res.message });
    } else if (!result.affectedRows) {
      res.json({
        message: 'Employee not found',
      });
    } else {
      res.json({
        message: 'deleted',
        changes: result.affectedRows,
        id: req.params.id,
      });
    }
  });
});

// Create a employee
app.post('/api/employee', ({ body }, res) => {
  const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`;
  const params = [
    body.first_name,
    body.last_name,
    body.role_id,
    body.manager_id,
  ];

  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: body,
    });
  });
});

// show all roles
app.get('/api/roles', (req, res) => {
  const sql = `SELECT * FROM roles`;
  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: rows,
    });
  });
});

// show single role
app.get('/api/roles/:id', (req, res) => {
  const sql = `SELECT * FROM roles WHERE id =?`;
  const params = [req.params.id];
  db.query(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: rows,
    });
  });
});
// delete role
app.delete('/api/roles/:id', (req, res) => {
  const sql = `DELETE FROM roles WHERE id = ?`;
  const params = [req.params.id];
  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: res.message });
      // checks if anything was deleted
    } else if (!result.affectedRows) {
      res.json({
        message: 'role not found',
      });
    } else {
      res.json({
        message: 'deleted',
        changes: result.affectedRows,
        id: req.params.id,
      });
    }
  });
});
// update employee role
app.put('/api/employee/:id', (req, res) => {
  const sql = `UPDATE employee SET role_id = ?
               WHERE id = ?`;
  const params = [req.body.role_id, req.params.id];
  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      // check if a rocrd was found
    } else if (!result.affectedRows) {
      res.json({
        message: 'Employee not found',
      });
    } else {
      res.json({
        message: 'success',
        data: req.body,
        changes: result.affectedRows,
      });
    }
  });
});

// Add Role
app.post('/api/roles', ({ body }, res) => {
  const sql = `INSERT INTO roles (title, salary, department_id) VALUES (?,?,?)`;
  const params = [body.title, body.salary, body.department_id];

  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: body,
    });
  });
});

// show all departments
app.get('/api/department', (req, res) => {
  const sql = `SELECT * FROM department`;
  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: rows,
    });
  });
});

// show single department
app.get('/api/department/:id', (req, res) => {
  const sql = `SELECT * FROM department WHERE id =?`;
  const params = [req.params.id];
  db.query(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: rows,
    });
  });
});
// add a department
app.post('/api/department', ({ body }, res) => {
  const sql = `INSERT INTO department (department_name) VALUES (?)`;
  const params = [body.department_name];

  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: body,
    });
  });
});

// delete role
app.delete('/api/department/:id', (req, res) => {
  const sql = `DELETE FROM department WHERE id = ?`;
  const params = [req.params.id];
  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: res.message });
      // checks if anything was deleted
    } else if (!result.affectedRows) {
      res.json({
        message: 'department not found',
      });
    } else {
      res.json({
        message: 'deleted',
        changes: result.affectedRows,
        id: req.params.id,
      });
    }
  });
});

// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
