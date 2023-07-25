USE employee_db;

INSERT INTO department (name)
VALUES ("Sales");
INSERT INTO department (name)
VALUES ("Engineering");
INSERT INTO department (name)
VALUES ("Finance");
INSERT INTO department (name)
VALUES ("Legal");

INSERT INTO role (title, salary, department_id)
VALUES ("Sales Lead", 100000.00, 1);
INSERT INTO role (title, salary, department_id)
VALUES ("Salesperson", 80000.00, 1);
INSERT INTO role (title, salary, department_id)
VALUES ("Lead Engineer", 150000.00, 2);
INSERT INTO role (title, salary, department_id)
VALUES ("Software Engineer", 120000.00, 2);
INSERT INTO role (title, salary, department_id)
VALUES ("Account Manager", 160000.00, 3);
INSERT INTO role (title, salary, department_id)
VALUES ("Accountant", 125000.00, 3);
INSERT INTO role (title, salary, department_id)
VALUES ("Legal Team Lead", 250000.00, 4);
INSERT INTO role (title, salary, department_id)
VALUES ("Lawyer", 190000.00, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Jordan", "Belfort", 1, NULL);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("");
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Tony", "Stark", 4, NULL);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ();
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ();
