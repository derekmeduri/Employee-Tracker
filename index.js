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

function addDepartment() {
  inquirer
    .prompt({
      name: "newDept",
      type: "input",
      message: "What is the name of the Department you would like to create?",
    })
    .then(function (answer) {
      db.query(
        "INSERT INTO department (name) VALUES (?)",
        [answer.deptName],
        function (error, res) {
          if (error) throw error;
          console.log(res);
          startScreen();
        }
      );
    });
}
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
      db.query(
        "INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)",
        [answer.newRole, answer.yearlySalary, answer.deptID],
        function (error, res) {
          if (error) throw error;
          console.log(res);
          startScreen();
        }
      );
    });
}

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
      db.query(
        "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)",
        [answer.neFirst, answer.neLast, answer.roleID, answer.managerID],
        function (error, res) {
          if (error) throw error;
          console.log(res);
          startScreen();
        }
      );
    });
}

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
