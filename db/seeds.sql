INSERT INTO department (name)
VALUES
('Engineering'),
('Legal'),
('Management'),
('Sales');

INSERT INTO roles (title, salary, department_id)
VALUES
('Engineer', 40000.00, 1),
('Lawyer', 60000.00, 2),
('Manager', 50000.00, 3),
('Sales Lead', 34000.00, 4),
('Salesperson',22000.00, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id )
VALUES
('Robert', 'Shoemaker', 1, 2),
('Krista', 'Comollo', 3, NULL),
('Brian', 'Shoemaker', 2, 2),
('Mike', 'Hutwagner', 4, 2),
('Bob', 'Waggonner', 5, 2),
('John', 'Silhavy', 2, 2);
