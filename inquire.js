const inquirer = require("inquirer");

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
                break;
            case "View all employees by department":
                console.log("Viewing department employees");
                break;
            case "View all employees by manager":
                console.log("Viewing manager employees");
                break;
            case "Add employee":
                console.log("Add employee");
                addEmployee();
                break;
            case "Remove employee":
                console.log("Remove employee");
                break;
            case "Update Employee Role":
                console.log("Update Role");
                updateEmployee();
                break;
            case "Update Manager Role":
                console.log("Update Manager");
                break;
            default:
                console.log("Thanks for playin'!");

        };
    });
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
        ])
    }

    function updateEmployee() {
        inquirer.prompt([
            {
                type: "input",
                name: "department",
                message: "What is this employee's new department?"
            }
        ])
    }

}

promptUser();