const inquirer = require("inquirer");
const Employee = require("./employee");
const mysql = require("mysql");
const addedEmployees = [];

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "skyWalker1!",
    database: "companyDB"
});

connection.connect(function (err) {
    if (err) {
        console.error("Error Connecting: " + err.stack);
        return;
    }

    console.log("Connected as ID: " + connection.threadId);
});

// id first_name last_name title department salary manager
function promptUser() {
    return inquirer.prompt([
        {
            type: "list",
            name: "task",
            message: "What would you like to do?",
            choices: [
                "View all employees",
                "View all employees by department",
                "View all employees by manager",
                "Add employee",
                "Remove employee",
                "Update Employee Role",
                "Update Employee Manager",
                "Add Department",
                "Add Role"
            ]
        }
    ]).then(function (response) {
        switch (response.task) {
            case "View all employees":
                console.log("Viewing employees");
                showEmployees();
                break;
            case "View all employees by department":
                console.log("Viewing department employees");
                showEmployeesByDept();
                break;
            case "View all employees by manager":
                console.log("Viewing manager employees");
                showEmployeesByMgr();
                break;
            case "Add employee":
                console.log("Add employee");
                addEmployee();
                break;
            case "Remove Employee":
                console.log("Remove Employee");
                removeEmployee();
                break;
            case "Update Employee Role":
                console.log("Update Role");
                updateEmployee();
                break;
            case "Update Employee Manager":
                console.log("Update Manager");
                updateMgr();
                break;
            case "Add Department":
                console.log("Adding department");
                addDepartment();
                break;
            case "Add Role":
                console.log("Adding role");
                addRole();
                break;
            default:
                console.log("Thanks for playin'!");

        };
    });

    function showEmployees() {
        const query = "SELECT * FROM companyDB.employee_table";
        connection.query(query, (err, res) => {
            if (err) throw err;
            for (var i = 0; i < res.length; i++) {
                console.log("First: " + res[i].first_name + "\n Last: " + res[i].last_name + "\n\n");
              }
            promptUser();
        });

    };

    function showEmployeesByDept() {
        console.log("Here are your employees by department");
    };

    function showEmployeesByMgr() {
        console.log("Here are your employees by manager");
    };

    function addEmployee() {
        inquirer.prompt([
            {
                type: "input",
                name: "first_name",
                message: "What is this employee's first name?"
            }, {
                type: "input",
                name: "last_name",
                message: "What is their last name?"
            }, {
                type: "input",
                name: "title",
                message: "What is their title?"
            }, {
                type: "input",
                name: "department",
                message: "What is their department?"
            }, {
                type: "input",
                name: "salary",
                message: "What is their salary?"
            }, {
                type: "input",
                name: "manager",
                message: "Who is their manager?"
            }
        ]).then(function (answers) {

            const newEmployee = new Employee(
                answers.first_name,
                answers.last_name,
                answers.title,
                answers.department,
                answers.salary,
                answers.manager
            );

            addedEmployees.push(newEmployee);
            console.log(addedEmployees);
            console.log(addedEmployees[0].firstName);
            const query = "INSERT INTO employee_table (first_name, last_name) VALUES (?, ?)";
            connection.query(query, [addedEmployees[0].firstName, addedEmployees[0].lastName], (err, res) => {
                if (err) throw err;
                console.log("Employee added to database");
                promptUser();
            });

        })
    };

    function removeEmployee() {
        inquirer.prompt([
            {
                type: "input",
                name: "first_name",
                message: "What is the first name of the employee you would like to remove?"
            }, {
                type: "input",
                name: "last_name",
                message: "What is their last name?"
            }
        ]).then(function (answer) {

            const query = "DELETE FROM employee_table WHERE (first_name=? AND last_name=?)"
            connection.query(query, [answer.first_name, answer.last_name], (err, res) => {
                if (err) throw err;
                console.log("DELETED");
                promptUser();
            })
        })
    };

    function updateEmployee() {
        inquirer.prompt([
            {
                type: "input",
                name: "employee_name",
                message: "Which employee would you like to update?"
            }, {
                type: "input",
                name: "new_department",
                message: "What is their new department?"
            }
        ])
    };

    function updateMgr() {
        inquirer.prompt([
            {
                type: "input",
                name: "first_name",
                message: "What is the first name of the employee you would like to update?"
            }, {
                type: "input",
                name: "last_name",
                message: "What is their last name?"
            }, {
                type: "input",
                name: "new_manager",
                message: "Who is their new manager?"
            }
        ])
    };

    function addDepartment() {
        inquirer.prompt([
            {
                type: "input",
                name: "new_department",
                message: "What department would you like to add?"
            }
        ]).then(function (answer) {
            const query = "INSERT INTO department_table (name) VALUES (?)";
            connection.query(query, [answer.new_department], (err, res) => {
                if (err) throw err;
                console.log("Department added to database");
                promptUser();
            })
        })
    };

    function addRole() {
        inquirer.prompt([
            {
                type: "input",
                name: "new_role",
                message: "What role would you like to add?"
            }, {
                type: "input",
                name: "new_salary",
                message: "What is the salary?"
            }
        ]).then(function (answers) {
            const query = "INSERT INTO role_table (title, salary, department_id) VALUES (?, ?, ?)";
            connection.query(query, [answers.new_role, answers.new_salary, 50], (err, res) => {
                if (err) throw err;
                console.log("Role added to database");
                promptUser();
            })
        })
    };
}

promptUser();