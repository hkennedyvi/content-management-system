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
                "Update Employee Manager"
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
            case "Remove employee":
                console.log("Remove employee");
                removeEmployee();
                break;
            case "Update Employee Role":
                console.log("Update Role");
                updateEmployee();
                break;
            case "Update Manager Role":
                console.log("Update Manager");
                updateMgr();
                break;
            default:
                console.log("Thanks for playin'!");

        };
    });

    function showEmployees() {
        console.log(addedEmployees);
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
        console.log("DELETED");
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
                name: "manager_name",
                message: "Which manager would you like to update?"
            }, {
                type: "input",
                name: "new_role",
                message: "What is their new role?"
            }
        ])
    }
}

promptUser();