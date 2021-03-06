'use strict';

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/bangazon.sqlite');

module.exports. dbGetAllDepartments = () => {
	return new Promise( (resolve, reject) => {
		db.all(`SELECT * FROM departments`, (err, departmentsData) => {
			if(err) reject(err);
			resolve(departmentsData);
		});
	});
};

module.exports.dbGetOneDepartment = (id) => {
	return new Promise( (resolve, reject) => {
		db.get(`SELECT * FROM departments
						WHERE id = ${id}`, (err, department) => {
			if (err) reject(err);
			resolve(department);
		});
	});
};

module.exports.dbPostDepartment = (newDepartment) => {
	return new Promise( (resolve, reject) => {
		let { supervisor_employee_id, expense_budget, name } = newDepartment;
		db.run(`INSERT INTO departments(supervisor_employee_id, expense_budget, name)
			VALUES ("${supervisor_employee_id}", "${expense_budget}", "${name}")`, (err) => {
			if(err) reject(err);
			resolve("New field inserted");
		});
	});
};

module.exports.dbPutDepartment = (department, department_id) => {
	return new Promise( (resolve, reject) => {
		let query = `UPDATE departments SET `;
		let keys = (Object.keys(department));
		keys.forEach( (key) => {
			query += `"${key}" = "${department[key]}",`;
		});
		query = query.slice(0,-1);
		query += ` WHERE id = ${department_id}`;
		db.run(query, function(err) {
			if(err) reject(err);
			resolve({message: "department updated", rows_updated: this.changes});
		});
	});
};