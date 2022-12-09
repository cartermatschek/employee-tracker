const inquirer = require('inquirer');
const mysql = require('mysql2')
const db = require('./db/connection.js')
const cTable = require('console.table')

// Start Prompt
function init() {
    inquirer.prompt([
        {
            type: "list",
            name: "mainMenu",
            message: "What would you like to do?",
            choices: [
                "View All Departments",
                "View All Roles",
                "View All Employees",
                "Add Department",
                "Add Role",
                "Add Employee",
                "Update Employee Role",
                "Quit"]
        }
    ]).then(data => {
        switch (data.mainMenu) {
            case "View All Departments":
                viewAllDepartments();
                break;
            case "View All Roles":
                viewAllRoles();
                break;    
            case "View All Employees":
                viewAllEmployees();
                break;    
            case "Add Department":
                addDepartment();
                break;    
            case "Add Role":
                addRole();
                break;    
            case "Add Employee":
                addEmployee();
                break;    
            case "Update Employee Role":
                UpdateEmployeeRole();
                break;
            default:
                quit();
        }
        })
    }

// View all departments
function viewAllDepartments() {
    db.query('select * from department', (err, res) => {
        if (err) throw err
        console.table(res)
        init()
    })
}

// View all roles
function viewAllRoles() {
    db.query('select * from role', (err, res) => {
        if (err) throw err
        console.table(res)
        init()
    })
}

// View all employees
function viewAllEmployees() {
    db.query('select * from employee', (err, res) => {
        if (err) throw err
        console.table(res)
        init()
    })
}

// Add department
function addDepartment() {
    db.query("SELECT * FROM department", function (err, res) {
        if (err) throw err;     
        inquirer.prompt([
          {
            name: "title",
            type: "input",
            message: "What is the title of the new department?"
          },
        ]).then(function (answers) {
          const department = res.find(dept => dept.name === answers.deptId);
          db.query("INSERT INTO department SET ?",
            {
              name: answers.title,
            },
            function (err, res) {
              if (err) throw err;
              console.log("New department added!\n");
              init();
            })
        });
      })
    }

// Add role
function addRole() {
    db.query("SELECT * FROM department", function (err, res) {
        if (err) throw err;
        //asking for the three properties on the roles table      
        inquirer.prompt([
          {
            name: "title",
            type: "input",
            message: "What is the title of the new role?"
          },
          {
            name: "salary",
            type: "number",
            message: "What is the salary of this position?",
          },
          {
            name: "deptId",
            type: "list",
            message: "Select a department for this role",
            choices: res.map(department => department.name)
          }
        ]).then(function (answers) {
          const department = res.find(dept => dept.name === answers.deptId);
          db.query("INSERT INTO role SET ?",
            {
              title: answers.title,
              salary: answers.salary,
              department_id: department.id
            },
            function (err, res) {
              if (err) throw err;
              console.log("New role added!\n");
              init();
            }
          );
        });
      })
    };

// Add employee
function addEmployee() {
db.query("SELECT * FROM role", function (err, res) {
    if (err) throw err;
    //asking for the four properties on the employee table plus department    
    inquirer.prompt([
      {
        name: "first",
        type: "input",
        message: "What is the new employee's first name?"
      },
      {
        name: "last",
        type: "input",
        message: "What is the new employee's last name?"
      },
      {
        name: "roleId",
        type: "list",
        message: "Select a role for this employee",
        choices: res.map(role => role.title)
      },
      {
        name: "managerId",
        type: "list",
        message: "Select a manager for this employee",
        choices: [1, 2, 3]
      },
    ]).then(function (answers) {
      const role = res.find(role => role.title === answers.roleId);
      db.query("INSERT INTO employee SET ?",
        {
          first_name: answers.first,
          last_name: answers.last,
          role_id: role.id,
          manager_id: answers.managerId,
        },
        function (err, res) {
          if (err) throw err;
          console.log("New employee added!\n");
          init();
        }
      );
    });
  });
}
// Update employee role
function UpdateEmployeeRole() {
    db.query("SELECT * FROM employee", function (err, res) {
        if (err) throw err;     
        inquirer.prompt([
          {
            name: "title",
            type: "list",
            message: "Which employee do you want to update?",
            choices: res.map(employee => employee.first_name + " " + employee.last_name)
          },
        ]).then(function (answers) {
          const employee = res.find(employee => employee.first_name + " " + employee.last_name === answers.title);
          db.query("SELECT * FROM role", function (err, res){
            if (err) throw err;     
            inquirer.prompt([
          {
            name: "role",
            type: "list",
            message: "What role do want this employee to have?",
            choices: res.map(role => role.title)
          },
           ]).then(function (answers) {
            const role = res.find(role => role.title === answers.role);
            db.query("UPDATE employee SET role_id = ? WHERE id = ?", [role.id, employee.id])
        init()
           });
         });
        });
      })
    };
// Quit
function quit() {
    process.exit();
}

init()