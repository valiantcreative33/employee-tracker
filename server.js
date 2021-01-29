const inquirer = require('inquirer');
const mysql = require('mysql2');

// Connection to mySQL server for Inquirer to call upon
const connection = mysql.createConnection({
    host: '27.0.0.1',
    user: 'root',
    password: 'password',
    // port: 3308,
    database: 'company_db'
});

// connection.connect();

function promptUser() {
    inquirer
        .prompt ({
        type: 'list',
        name: 'actionsMenu',
        message: 'What would you like to do?',
        choices: ['View all employees', 'View all departments', 'View all roles', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee', 'Exit']
        })
        .then(choices => {
            switch (choices['actionsMenu']) {
                case 'View all employees':
                    allEmployees();
                    break;
                case 'View all departments':
                    allDepartments();
                    break;
                case 'View all roles':
                    allRoles();
                    break;
                case 'Add a department':
                    addDepartment();
                     break;
                case 'Add a role':
                    addRole();
                     break;
                case 'Add an employee':
                    addEmployee();
                     break;
                case 'Update an employee':
                    updateEmployee();
                     break;
                case 'Exit':
                    exit();
            }
        })
} 

const allEmployees = () => {
    connection.query(
        `SELECT * FROM employee`,
        function(err, result) {
            console.log('\n')
            console.table(result);
            promptUser();
        }
    );
};

const allDepartments = () => {
    connection.query(
        `SELECT * FROM department`,
        function(err, result) {
            console.log('\n')
            console.table(result);
            promptUser();
        }
    );
};
const allRoles = () => {
    connection.query(
        `SELECT * FROM role`,
        function(err, result) {
            console.log('\n')
            console.table(result);
            promptUser();
        }
    );
};
function addRole() {
    inquirer 
        .prompt([
            {
                type: 'text',
                name: 'newRole',
                message: 'Enter a new Role.',
                validate: roleData => {
                    if (roleData) return true; console.log('Nothing was entered. Please enter a role.'); return false;
                }
            },    
            {
                type: 'number',
                name: 'salary',
                message: 'What is the salary of this employee? (e.g. 120000)',
                validate: salaryData => {
                    if (salaryData && salaryData >= 0) return true; console.log('No salary information was entered. Please enter a figure.'); return false;
                }
            },
            {
                type: 'number',
                name: 'departmentId',
                message: 'What is the department id of this employee? (e.g. 3)',
                validate: departmentData => {
                    if (departmentData && departmentData >= 0) return true; console.log('No department id was entered. Please enter a whole number.'); return false;
                }
            }
        ])  
        .then(dataInput => {
            console.log('======HIIIII=====', dataInput);
            connection.query(
                // ? is a query that corresponds to the values within the objects
                'INSERT INTO role SET title = ?, salary = ?, department_id = ?',
                [dataInput.newRole, dataInput.salary, dataInput.departmentId],
                function(err, res) {
                    if (err) throw err;
                    console.log(res);
                    allRoles();
                }
            );
        })
};

function addDepartment() {
    inquirer 
        .prompt({
            type: 'text',
            name: 'newDepartment',
            message: 'Enter new department name',
            validate: departmentData => {
                if (departmentData) return true; console.log('Nothing was entered. Please enter department name.'); return false;
            }
        })
        .then(dataInput => {
            connection.query(
                'INSERT INTO department SET ?',
                    {
                        department_name: `${dataInput.newDepartment}`
                    },
                function() {
                    allDepartments();
                }
            );
        })
};

function addEmployee() {
    inquirer
        .prompt([
            {
                type: 'text',
                name: 'firstName',
                message: 'Enter the first name of the employee',
                validate: firstNameData => {
                    if (firstNameData) return true; console.log('Nothing was entered. Please enter the first name of the employee.'); return false; 
                }
            },
            {
                type: 'text',
                name: 'lastName',
                message: 'Enter the last name of the employee',
                validate: lastNameData => {
                    if (lastNameData) return true; console.log('Nothing was entered. Please enter the last name of the employee.'); return false; 
                }
            },
            {
                type: 'number',
                name: 'roleId',
                message: 'What is the role id for this employee?',
                validate: roleIdData => {
                    if (roleIdData) return true; console.log('Nothing was entered. Please enter the role id of the employee.'); return false;
                }
            },
            {
                type: 'confirm',
                name: 'isManager',
                message: 'Does this employee have a manager?'
            },
            {
                type: 'text',
                name: 'managerId',
                message: 'What is the id of the manager?',
                when: answer => answer.isManager === true
            }
        ])
        .then(dataInput => {
            connection.query(
                `INSERT INTO employee SET first_name = ?, last_name = ?, role_id = ?, manager_id = ?`,
                [dataInput.firstName, dataInput.lastName, dataInput.roleId, dataInput.managerId],
                function(err, res) {
                    if (err) throw err;
                    console.log(res);
                    allEmployees();
                }
            )
        })
};
function updateEmployee() {
    inquirer
        .prompt([
            {
               type: 'number',
               name: 'updateEmployee',
               message: 'What is the id of the employee that you want to update?' 
            },
            {
                type: 'number',
                name: 'updateRoleId',
                message: 'What is the update role id for the employee?'
            },
            {
                type: 'number',
                name: 'employeeManager',
                message: 'Please enter the updated Manager id for the employee. If the employee no longer has a Manager, leave this blank.'
            }
        ])
        .then(dataInput => {
            if (isNaN(dataInput.employeeManager)) {
                dataInput.employeeManager = null;
            }
            console.log(dataInput);
            connection.query(
                `UPDATE employee SET role_id = ?, manager_id = ?   
                WHERE id = ?`,
                [dataInput.updateRoleId, dataInput.employeeManager, dataInput.updateEmployee],
                function( err, res) {
                    if (err) throw err;
                    console.log('success', res);
                    allEmployees();
                }
            )
        })
}

const exit = () => {
    connection.end();
};

promptUser();

module.exports = { promptUser, connection };