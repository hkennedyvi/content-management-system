class Employee {
    constructor (firstName, lastName, title, department, salary, manager) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.title = title;
        this.department = department;
        this.salary = salary;
        this.manager = manager;
    } 

    // getName() {
    //     return this.name;
    // }

    // getId() {
    //     return this.id;
    // }

    // getEmail() {
    //     return this.email;
    // }

    // getRole() {
    //     return "Employee";
    // }
};

module.exports = Employee;