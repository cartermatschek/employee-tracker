INSERT INTO department (name)
VALUES ('Administration'), ('Education'), ('Front Office'), ('Auxillary');

INSERT INTO role (title, salary, department_id)
VALUES
('Principal', 100000.00, 1),
('Counselor', 80000.00, 1),
('Teacher', 60000.00, 2),
('Attendance Clerk', 40000.00, 3),
('Secretary', 30000.00, 3),
('Custodian', 20000.00, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('Susan', 'Sullivan', 1, null),
('Staci', 'Cote', 1, 1),
('Chris', 'Yee', 2, 1),
('Cheryl', 'Kleffner', 3, 1),
('Camille', 'Garcia', 3, 1),
('Ramon', 'Martinez', 4, 1),

-- What to input for ids?

