INSERT INTO department (department_name)
VALUES
    ('Engineering'),
    ('Marketing'),
    ('Sales'),
    ('Copy'),
    ('Customer Service');

INSERT INTO role (title, salary, department_id)
VALUES
    ('Head Engineer', 500000, 1),
    ('Engineer', 100000, 1),
    ('Marketing Director', 200000, 2),
    ('Graphic Designer', 55000, 2),
    ('Digital Manager', 75000, 2),
    ('Sales Director', 120000, 3),
    ('Salesperson', 70000, 3),
    ('Copywriter Director', 150000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
    ('George', 'St.Pierre', 1, NULL),
    ('Nurmagomedov', 'Khabib', 2, 1),
    ('Holloway', 'Max', 3, NULL),
    ('Charles', 'Oliveira', 4, 3),
    ('Silva', 'Anderson', 5, 3),
    ('Clark', 'Kent', 6, NULL),
    ('Jim', 'Carrey', 7, 6),
    ('Wayne', 'Bruce', 7, 6),
    ('Rogan', 'Joe', 8, NULL);