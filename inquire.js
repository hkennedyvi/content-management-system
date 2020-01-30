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

startApp = () => {

    connection.connect(function (err) {
        if (err) {
            console.error("Error Connecting: " + err.stack);
            return;
        }

        console.log("Connected as ID: " + connection.threadId);
    })
    setTimeout(() => {
        inquirer.prompt([
            {
                type: "confirm",
                name: "start",
                message: "Welcome, are you ready to begin?"
            }
        ]).then(function (answer) {
            if (answer.start === true) {
                return promptUser();
            } else console.log("Goodbye");
        })
    }, 100)
}

// id first_name last_name title department salary manager
promptUser = () => {
    return inquirer.prompt([
        {
            type: "list",
            name: "task",
            message: "What would you like to do?",
            choices: [
                "View all employees",
                "View all departments",
                "View all roles",
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
    ]).then((response) => {
        switch (response.task) {
            case "View all employees":
                showEmployees();
                break;
            case "View all departments":
                showDepartments();
                break;
            case "View all roles":
                showRoles();
                break;
            case "View all employees by department":
                showEmployeesByDept();
                break;
            case "View all employees by manager":
                showEmployeesByMgr();
                break;
            case "Add employee":
                addEmployee();
                break;
            case "Remove employee":
                removeEmployee();
                break;
            case "Update Employee Role":
                updateEmployee();
                break;
            case "Update Employee Manager":
                updateMgr();
                break;
            case "Add Department":
                addDepartment();
                break;
            case "Add Role":
                addRole();
                break;
            default:
                console.log("Thanks for playin'!");

        };
    });
    //WORKS!
    function showEmployees() {
        const query = "SELECT * FROM companyDB.employee_table";
        connection.query(query, (err, res) => {
            if (err) throw err;
            console.log("\n EMPLOYEES AT THIS AGENCY:");
            for (var i = 0; i < res.length; i++) {
                console.log("\n First: " + res[i].first_name + "\n Last: " + res[i].last_name + "\n");
            }
            promptUser();
        });

    };
    //WORKS!
    function showDepartments() {
        const query = "SELECT * FROM companyDB.department_table";
        connection.query(query, (err, res) => {
            if (err) throw err;
            console.log("\n DEPARTMENTS AT THIS AGENCY:");
            for (var i = 0; i < res.length; i++) {
                console.log("\n Department: " + res[i].name + "\n");
            }
            promptUser();
        });

    };
    //WORKS!
    function showRoles() {
        const query = "SELECT * FROM companyDB.role_table";
        connection.query(query, (err, res) => {
            console.log("\n ROLES AT THIS AGENCY:");
            if (err) throw err;
            for (var i = 0; i < res.length; i++) {
                console.log("\n Title: " + res[i].title + "\n");
            }
            promptUser();
        });

    };

    function showEmployeesByDept() {
        console.log("Here are your employees by department");
        promptUser();
    };

    function showEmployeesByMgr() {
        console.log("Here are your employees by manager");
        promptUser();
    };
    //WORKS!
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
                message: "What is their role ID#?"
            }, {
                type: "input",
                name: "department",
                message: "What is their department ID#?"
            }, {
                type: "input",
                name: "salary",
                message: "What is their salary?"
            }, {
                type: "input",
                name: "manager",
                message: "What is their manager's ID# (type null if no manager)?"
            }
        ]).then((answers) => {

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

            const query = "INSERT INTO employee_table (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)";
            connection.query(query, [addedEmployees[0].firstName, addedEmployees[0].lastName, addedEmployees[0].title, addedEmployees[0].department], (err, res) => {
                if (err) throw err;
                console.log("\n EMPLOYEE ADDED \n");
                promptUser();
            });

        })
    };
    //WORKS!
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
        ]).then((answer) => {

            const query = "DELETE FROM employee_table WHERE (first_name=? AND last_name=?)"
            connection.query(query, [answer.first_name, answer.last_name], (err, res) => {
                if (err) throw err;
                console.log("\n DELETED \n");
                promptUser();
            })
        })
    };
    //WORKS!
    function updateEmployee() {
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
                name: "new_role",
                message: "What is their new role ID#?"
            }
        ]).then((answers) => {
            const query = "UPDATE employee_table SET role_id=? WHERE (first_name=? AND last_name=?)"
            connection.query(query, [answers.new_role, answers.first_name, answers.last_name], (err, res) => {
                if (err) throw err;
                console.log("\n UPDATED ROLE \n");
                promptUser();
            });
        })
    };
    //WORKS!
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
                message: "What is their new manager's ID# (type null if no manager)?"
            }
        ]).then((answers) => {
            const query = "UPDATE employee_table SET manager_id=? WHERE (first_name=? AND last_name=?)"
            connection.query(query, [answers.new_manager, answers.first_name, answers.last_name], (err, res) => {
                if (err) throw err;
                console.log("\n UPDATED MANAGER \n");
                promptUser();
            });
        })
    };
    //WORKS!
    function addDepartment() {
        inquirer.prompt([
            {
                type: "input",
                name: "new_department",
                message: "What department would you like to add?"
            }
        ]).then((answer) => {
            const query = "INSERT INTO department_table (name) VALUES (?)";
            connection.query(query, [answer.new_department], (err, res) => {
                if (err) throw err;
                console.log("\n DEPARTMENT ADDED \n");
                promptUser();
            })
        })
    };
    //WORKS!
    function addRole() {
        inquirer.prompt([
            {
                type: "input",
                name: "new_role",
                message: "What job title would you like to add?"
            }, {
                type: "input",
                name: "new_salary",
                message: "What is the salary for this position?"
            }, {
                type: "input",
                name: "new_department",
                message: "What is the department ID#?"
            }
        ]).then((answers) => {
            const query = "INSERT INTO role_table (title, salary, department_id) VALUES (?, ?, ?)";
            connection.query(query, [answers.new_role, answers.new_salary, answers.new_department], (err, res) => {
                if (err) throw err;
                console.log("\n ROLE ADDED \n");
                promptUser();
            })
        })
    };
}

startApp();