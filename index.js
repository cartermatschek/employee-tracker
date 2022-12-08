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
            message: "What would you like to do? (Use arrow keys)",
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
            case "View All Departments":
                viewAllEmployees();
                break;    
            case "Add Department":
                addDepartment();
                break;    
            case "Add Role":
                allRole();
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
    
}
// View all roles

// View all employees

// Add department

// Add role

// Add employee

// Update employee role

// Quit
function quit() {
    process.exit();
}