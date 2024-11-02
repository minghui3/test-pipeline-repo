const pool = require("../database/pool");

/**
 * @typedef {Object} Employee
 * @property {string} employeeId - Unique identifier of employee
 * @property {string} name - Name of employee
 * @property {string} email - Email of employee
 * @property {string} contactNumber - Contact number of employee
 * @property {string} department - Department employee works in
 * @property {string} title - Work title of employee
 * @property {string} workLocation - Location where employee works at
 * @property {string} dateJoined - Date when employee joined
 * @property {string} annualLeaveRemaining - Number of leaves employee has left for the current year
 * @property {string} linkedIn - Link to employee's linked-in account
 * @property {string} skills - Skills employee has
 * @property {string} photoPath - Link to employee's photo
 * @property {string} languages - Languages employee can work in
 * @property {string} manager - ID of manager who manages employee
 */
class Employee {
    /**
     * Retrieves every employee record from the database
     *
     * @returns {Array<Employee>} An array of objects that each represents an employee
     */
    static async getEmployees() {
        try {
            const result = await pool.query(`SELECT * FROM employees;`);
            return result.rows.map((row) => ({
                employeeId: row.employee_id,
                name: row.name,
                email: row.email,
                contactNumber: row.contact_number,
                department: row.department,
                title: row.title,
                workLocation: row.work_location,
                dateJoined: row.date_joined,
                annualLeaveRemaining: row.annual_leave_remaining,
                linkedIn: row.linked_in,
                skills: row.skills,
                photoPath: row.photo_path,
                languages: row.languages,
                manager: row.manager,
            }));
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    /**
     * Adds a new employee record into the database
     *
     * @param {Object} body HTML body containing the attributes of the new employee
     *
     * @returns {Object} ID of newly added employee
     */
    static async addEmployee(body) {
        try {
            const sqlQuery = `
                INSERT INTO employees (
                name, email, contact_number, department, title, 
                work_location, date_joined, annual_leave_remaining,
                linked_in, skills, photo_path, languages, manager)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
                RETURNING employee_id;
            `;

            const values = [
                body.name,
                body.email,
                body.contactNumber,
                body.department,
                body.title,
                body.workLocation,
                body.dateJoined,
                body.annualLeaveRemaining,
                body.linkedIn,
                body.skills,
                body.photoPath,
                body.languages,
                body.manager,
            ];

            const result = await pool.query(sqlQuery, values);
            return { employeeId: result.rows[0].employee_id };
        } catch (err) {
            console.error(err);
            throw err;
        }
    }
}

module.exports = Employee;
