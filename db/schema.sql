DROP DATABASE IF EXISTS company_db;
CREATE DATABASE company_db;
USE company_db;

CREATE TABLE department (
    ID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    department_name VARCHAR(30)
);

CREATE TABLE role (
    ID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INT NOT NULL,
    FOREIGN KEY (department_id) REFERENCES department (id)
);

CREATE TABLE employee (
    ID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT NOT NULL,
    FOREIGN KEY (role_id) REFERENCES role (id),
    manager_id INT UNSIGNED 
);