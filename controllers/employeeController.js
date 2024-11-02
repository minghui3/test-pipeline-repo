const Employee = require("../models/employee");

const getEmployees = async (req, res) => {
    try {
        const employees = await Employee.getEmployees();
        res.status(200).json(employees);
    } catch (err) {
        res.status(500).send(err);
    }
};

const addEmployee = async (req, res) => {
    try {
        const employeeId = await Employee.addEmployee(req.body);
        res.status(200).json(employeeId);
    } catch (err) {
        res.status(500).send(err);
    }
};

module.exports = {
    getEmployees,
    addEmployee,
};
