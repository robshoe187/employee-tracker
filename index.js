const inquirer = require('inquirer');
const cTable = require('console.table');
const db = require('./db/connection');

const prompts = () => {     
    inquirer
        .prompt({
          type: 'list',
          message: 'What would you like to do?',
          name: 'action',
          choices: ['View All Departments', 'View All Roles', 'View All Employees','Add A Department', 'Add A Role', 'Add An Employee', 'Update An Employee Role']
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
                const sql = `SELECT roles.*,
                department.name AS department_name 
                FROM roles 
                LEFT JOIN department 
                ON roles.department_id = department.id`
                db.query(sql, (err, rows) => {
                    if (err) {
                        console.log(err);
                        return;
                      }
                      console.table(rows);     
                })

            }
            else if (action === 'View All Employees') {
               const sql = `SELECT employee.*,
               roles.title AS title,
               roles.salary AS salary
               FROM employee 
               LEFT JOIN roles 
               ON employee.role_id = roles.id`

                db.query(sql, (err, rows) => {
                    if (err) {
                        console.log(err);
                        return;
                      }
                      console.table(rows);     
                })
            }
            else if (action === 'Add A Department') {
                inquirer
                .prompt([
                    {
                    type: 'input',
                    message: 'What is the name of the department?',
                    name: 'name'
                    }
                ]).then(results => {
                    const sql = `INSERT INTO department (name) VALUES('${results.name}') `
                    db.query(sql, (err, rows) => {
                        if (err) {
                            console.log(err);
                            return;
                          }     
                    })
                    const sqlselect = `SELECT * FROM department`
                    db.query(sqlselect, (err, rows) => {
                        if (err) {
                            console.log(err);
                            return;
                          }
                          console.table(rows);     
                    })
                })
            }
            else if (action === 'Add A Role'){
                inquirer
                .prompt([
                    {
                    type: 'input',
                    message: 'What is the name of the role?',
                    name: 'role'
                    },
                    {
                        type: 'input',
                        message: 'What is the salary?',
                        name: 'salary'
                    },
                    {
                        type: 'input',
                        message : "What is the department id?",
                        name: 'department_id'
                    }
                ]).then(results => {
                    const sql = `INSERT INTO roles (title, salary, department_id) VALUES ('${results.role}', ${results.salary}, ${results.department_id})`
                    db.query(sql, (err, rows) => {
                        if (err) {
                            console.log(err);
                            return;
                          }     
                    })
                    const sqlselect = `SELECT roles.*,
                        department.name AS department_name 
                        FROM roles 
                        LEFT JOIN department 
                        ON roles.department_id = department.id`
                        db.query(sqlselect, (err, rows) => {
                            if (err) {
                                console.log(err);
                                return;
                              }
                              console.table(rows);     
                        })
                }) 
            }
            else if (action === 'Add An Employee') {
                inquirer
                .prompt([
                    {
                    type: 'input',
                    message: 'What is the first name of the employee?',
                    name: 'firstName'
                    },
                    {
                        type: 'input',
                        message: 'What is the  last name of the employee?',
                        name: 'lastName'
                    },
                    {
                        type: 'input',
                        message : "What is the role id of the employee?",
                        name: 'role'
                    }
                ]).then(results => {
                    const sql = `INSERT INTO employee (first_name, last_name, role_id) VALUES ('${results.firstName}', '${results.lastName}','${results.role}')`
                    db.query(sql, (err, rows) => {
                        if (err) {
                            console.log(err);
                            return;
                          }     
                    })
                    const sqlselect = `SELECT employee.*,
                    roles.title AS title,
                    roles.salary AS salary
                    FROM employee 
                    LEFT JOIN roles 
                    ON employee.role_id = roles.id`
                        db.query(sqlselect, (err, rows) => {
                            if (err) {
                                console.log(err);
                                return;
                              }
                              console.table(rows);     
                        })
                }) 
            }
            else if (action === 'Update An Employee Role') {
                let choice = [];
                let choiceRole = [];
                const sqlselect = `SELECT employee.first_name, employee.last_name FROM employee`
                const sqlselectRole = `SELECT roles.title FROM roles`
                db.query({sql: sqlselect, rowsAsArray: true }, function(err, results) {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    for (let i = 0; i < results.length; i++) {
                        choice.push(results[i].join(' '))
                    };
                    db.query({sql: sqlselectRole, rowsAsArray: true }, function(err, resultsRole) {
                        if (err) {
                            console.log(err);
                            return;
                        }
                        for (let i = 0; i < resultsRole.length; i++) {
                            choiceRole.push(resultsRole[i].join(' '))
                        };
                    inquirer
                    .prompt([
                        {
                        type: 'list',
                        message: 'What employee would you like to update?',
                        name: 'action',
                        choices: choice
                      },
                      {
                          type:'list',
                          message: 'What is their new role?',
                          name: 'role',
                          choices: choiceRole
                      }]);
                  });
                })
            } 
            else {
                console.log("Not a valid input")
                prompts();
            }
        });
        
};

prompts();