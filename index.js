const inquirer = require('inquirer');
const cTable = require('console.table');
const db = require('./db/connection');

inquirer
        .prompt({
          type: 'list',
          message: 'What would you like to do?',
          name: 'action',
          choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add A Role', 'Add An Employee', 'Update An Employee Role']
        })
        .then(({action}) => {
            if (action === 'View All Departments') {
                const sql = 'SELECT * FROM department'
                db.query(sql, (err, rows) => {
                    if (err) {
                        console.log(err);
                        return;
                      }
                      console.table(rows);   
                })
            }
            else if (action === 'View All Roles') {
                const sql = `SELECT roles.*, department.name AS department_name FROM roles LEFT JOIN department ON roles.department_id = department.name`
                db.query(sql, (err, rows) => {
                    if (err) {
                        console.log(err);
                        return;
                      }
                      console.table(rows);     
                })

            }
            else if (action === 'View All Employees') {
                const sql = 'SELECT * FROM employee LEFT JOIN roles ON employee.role_id = roles.id '
                db.query(sql, (err, rows) => {
                    if (err) {
                        console.log(err);
                        return;
                      }
                      console.table(rows);     
                })
            }
            else if (action === 'Add A Role'){

            }
            else if (action === 'Add An Employee') {
                
            }
            else if (action === 'Update AN Employee Role') {
                
            }else {
                console.log(action)
                console.log("Not a valid input")
            }
        });

