DROP DATABASE IF EXISTS companyDB;

CREATE DATABASE companyDB;

USE companyDB;

CREATE TABLE department_table (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30),
    PRIMARY KEY (id)
);

CREATE TABLE role_table (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR (30),
    salary DECIMAL,
    department_id INT NOT NULL, 
    PRIMARY KEY (id),
    CONSTRAINT fk_department FOREIGN KEY (department_id) REFERENCES department_table (id)
);

CREATE TABLE manager_table (
    id INT NOT NULL AUTO_INCREMENT,
    manager_name VARCHAR(30),
    PRIMARY KEY (id)
);

CREATE TABLE employee_table (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR (30),
    last_name VARCHAR (30),
    role_id INT NOT NULL, 
    manager_id INT NOT NULL, 
    PRIMARY KEY (id),
    CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES role_table (id),
    CONSTRAINT fk_manager FOREIGN KEY (manager_id) REFERENCES manager_table (id)
);

