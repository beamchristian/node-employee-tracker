INSERT INTO Department (department_name)
VALUES 
('Sales'),
('Engineering'),
('Finance'),
('Legal');

INSERT INTO Roles (title, salary, department_id)
VALUES 
('Sales Lead', 100000, 1),
('Salesperson', 80000, 1),
('Lead Engineer', 130000, 2),
('Software Engineer', 120000, 2),
('Account Manager', 150000, 3),
('Accountant', 90000, 3),
('Legal Team Lead', 250000, 4),
('Lawyer', 190000, 4);

INSERT INTO Employee (first_name, last_name, role_id, manager_id)
VALUES 
('Virginia', 'Woolf', 1, null),
('Piers', 'Gaveston', 7, null),
('Leroy', 'Jenkins', 6, 1),
('Katherine', 'Mansfield', 4, 1),
('Dora', 'Carrington', 2, 1),
('Edward', 'Bellamy', 3, 2),
('Montague', 'Summers', 8, 3),
('Octavia', 'Butler', 5, 3),
('Unica', 'Zurn', 4, 4);