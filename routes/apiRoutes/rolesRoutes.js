const express = require('express');
const router = express.Router();
const db = require('../../db/connection');

// show all roles
router.get('/roles', (req, res) => {
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
router.get('/roles/:id', (req, res) => {
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
router.delete('/roles/:id', (req, res) => {
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
router.put('/employee/:id', (req, res) => {
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
router.post('/roles', ({ body }, res) => {
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

module.exports = router;
