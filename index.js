//required dependencies
const inquirer = require("inquirer");
const mysql = require("mysql2");
const db = require(".");
const cTable = require("console.table");

//conect to database
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "employee_db",
});

connection.connect(function (error) {
  if (error) throw error;
  console.log("connected");

  startScreen();
});
//start screen function to prompt employee database choices
function startScreen() {
  inquirer
    .prompt({
      name: "choices",
      type: "list",
      choices: [
        "View All Employees",
        "Add Employee",
        "Update Employee Role",
        "View All Roles",
        "Add Role",
        "View All Departments",
        "Add Department",
        "Quit",
      ],
      message: "What would you like to do?",
    })
    .then(function (result) {
      console.log("You've selected: " + result.choices);

      //switch cases depending on selection at start screen
      switch (result.choices) {
        case "Add Department":
          addDepartment();
          break;

        case "Add Role":
          addRole();
          break;

        case "Add Employee":
          addEmployee();
          break;

        case "View All Employees":
          viewEmployees();
          break;

        case "Update Employee Role":
          updateRole();
          break;

        case "View All Roles":
          viewRoles();
          break;

        case "View All Departments":
          viewDepartments();

        default:
          quit();
      }
    });
}
//function to prompt user which department they are creating
//need name of dept
function addDepartment() {
  inquirer
    .prompt({
      name: "newDept",
      type: "input",
      message: "What is the name of the Department you would like to create?",
    })
    .then(function (answer) {
      connection.query(
        "INSERT INTO department (name) VALUES (?)",
        [answer.deptName],
        function (error, res) {
          if (error) throw error;
          console.table(res);
          startScreen();
        }
      );
    });
}
//function when user selects to add role
//need to prompt user for new role, salary and dept id number.
function addRole() {
  inquirer
    .prompt([
      {
        name: "newRole",
        type: "input",
        message: "What is the name of rhe Role you would like to create?",
      },
      {
        name: "yearlySalary",
        type: "input",
        message: "What is the yearly Salary for this Role?",
      },
      {
        name: "deptID",
        type: "input",
        message: "What is the Department ID for this Role?",
      },
    ])
    .then(function (answer) {
      connection.query(
        "INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)",
        [answer.newRole, answer.yearlySalary, answer.deptID],
        function (error, res) {
          if (error) throw error;
          console.table(res);
          startScreen();
        }
      );
    });
}
//function to add employee
//need to prompt user for first name, last name and role id
function addEmployee() {
  inquirer
    .prompt([
      {
        name: "neFirst",
        type: "input",
        message: "What is the First Name of the new Employee?",
      },
      {
        name: "neLast",
        type: "input",
        message: "What is their Last Name?",
      },
      {
        name: "roleID",
        type: "input",
        message: "What is the employee's Role ID number?",
      },
      {
        name: "managerID",
        type: "input",
        message: "What is their manager's ID number?",
      },
    ])
    .then(function (answer) {
      connection.query(
        "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)",
        [answer.neFirst, answer.neLast, answer.roleID, answer.managerID],
        function (error, res) {
          if (error) throw error;
          console.table(res);
          startScreen();
        }
      );
    });
}
//function when user wants to view all employeesf rom database
function viewEmployees() {
  let query = "SELECT * FROM employee";
  connection.query(query, function (error, res) {
    if (error) throw error;
    console.table(res);
    startScreen();
  });
}
//function for when user selects to update role. need to prompt questions for role.
function updateRole() {
  inquirer
    .prompt([
      {
        name: "updateEmp",
        type: "input",
        message: "Which employee would you like to update?",
      },
      {
        name: "updatedRole",
        type: "input",
        message: "What is the Role ID number for their new Role?",
      },
    ])
    .then(function (answer) {
      connection.query(
        "UPDATE employee SET role_id WHERE first_name = ? ",
        [answer.updatedRole, answer.updateEmp],
        function (error, res) {
          if (error) throw error;
          console.table(res);
          startScreen();
        }
      );
    });
}
//function for when user wants to view all roles
function viewRoles() {
  let query = "SELECT * FROM role";
  connection.query(query, function (error, res) {
    if (error) throw error;
    console.table(res);
    startScreen();
  });
}
//function when user wants to select/view all departments
function viewDepartments() {
  let query = "SELECT * FROM department";
  connection.query(query, function (error, res) {
    if (error) throw error;
    console.table(res);
    startScreen();
  });
}
//when user selects quit the connection is ended
function quit() {
  connection.end();
  process.exit();
}
