const inquirer = require("inquirer");
const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "employee_db",
});

db.connect(function (error) {
  if (error) throw error;
  console.log("");

  startScreen();
});

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

function addDepartment() {}

function addRole() {}

function addEmployee() {}

function viewEmployees() {
  let query = "SELECT * FROM employee";
  db.query(query, function (error, res) {
    if (error) throw error;
    console.log(res);
    startScreen();
  });
}

function updateRole() {}

function viewRoles() {
  let query = "SELECT * FROM role";
  db.query(query, function (error, res) {
    if (error) throw error;
    console.log(res);
    startScreen();
  });
}

function viewDepartments() {
  let query = "SELECT * FROM department";
  db.query(query, function (error, res) {
    if (error) throw error;
    console.log(res);
    startScreen();
  });
}

function quit() {}
