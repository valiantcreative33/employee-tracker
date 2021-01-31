const { promptUser, connection } = require('../server');

const allEmployees = () => {
    connection.query(
        `SELECT e1.id, e1.first_name AS 'First Name', 
        e1.last_name as 'Last Name', department.department_name AS Department, role.title as Title, 
        role.salary as Salary, CONCAT(e2.first_name, ' ', e2.last_name) AS Manager
        FROM employee AS e1 INNER JOIN role ON e1.role_id = role.id
        INNER JOIN department ON department.id = role.department_id
        LEFT JOIN employee AS e2 ON e1.manager_id = e2.id;`,
        function(err, result) {
            if (err) throw err;
            console.table(result);
            promptUser();
        }
    );
};

const allDepartments = () => {
    connection.query(
        `SELECT * FROM department`,
        function(err, result) {
            console.table(result);
            promptUser();
        }
    );
};

const allRoles = () => {
    connection.query(
        `SELECT * FROM role`,
        function(err, result) {
            console.table(result);
            promptUser();
        }
    );
};

function empByDepartment() {
    connection.query(
        `SELECT CONCAT(employee.first_name, ' ', employee.last_name) AS name, department.department_name AS department
        FROM employee
        INNER JOIN role 
        ON role.id = employee.role_id
        INNER JOIN department
        ON role.department_id = department.id`,
        function(err, res) {
            if (err) throw err;
            console.table(res);
            promptUser();
        }
    );    
}

function costPerDepartment() {
    connection.query(
        `SELECT department.department_name AS Department, SUM(role.salary) AS Cost
        FROM department
        INNER JOIN role 
        ON role.department_id = department.id
        GROUP BY department.department_name;`,
        function(err, res) {
            if (err) throw err;
            console.table(res);
            promptUser();
        }
    )
}

module.exports = { allEmployees, allDepartments, allRoles, empByDepartment, costPerDepartment };