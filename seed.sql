USE companyDB;

INSERT INTO department_table (name)
VALUES ("Creative"), ("Accounts"), ("Media"), ("Finance");

INSERT INTO role_table (title, salary, department_id)
VALUES ("Copywriter", 45000, 1), ("Strategist", 50000, 2), ("Assistant", 55000, 4), ("Planner", 40000, 3);

INSERT INTO manager_table (manager_name)
VALUES ("Creatives Manager"), ("Accounts Manager"), ("Media Manager"), ("Finance Manager");

INSERT INTO employee_table (first_name, last_name, role_id, manager_id)
VALUES ("Jerrod", "Carmichael", 2, 2), ("Leslie", "Knopp", 1, 1), ("Tony", "Soprano", 3, 4), ("Luka", "Doncic", 4, 3);