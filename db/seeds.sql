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

INSERT INTO employee (first_name, last_name, role_id)
VALUES
('Robert', 'Shoemaker', 1),
('Krista', 'Comollo', 3),
('Brian', 'Shoemaker', 2),
('Mike', 'Hutwagner', 4),
('Bob', 'Waggonner', 5),
('John', 'Silhavy', 2);
