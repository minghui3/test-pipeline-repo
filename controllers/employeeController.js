 const Employee = require("../models/employee");

const getEmployees = async (req, res) => {
    try {
        const employees = await Employee.getEmployees();
        res.status(200).json(employees);
    } catch (err) {
        res.status(500).send("Error fetching employees");
    }
};

const getEmployeeById = async (req, res) => {
    const { employeeId } = req.params;
    try {
        const employee = await Employee.getEmployeeById(employeeId);
        if (employee) {
            res.status(200).json(employee);
        } else {
            res.status(404).send({ message: 'Employee not found' });
        }
    } catch (err) {
        res.status(500).send("Error fetching employee");
    }
};

const getManagers = async (req, res) => {
    try {
        const employees = await Employee.getManagers();
        res.status(200).json(employees);
    } catch (err) {
        res.status(500).send("Error fetching employees");
    }
};

const addEmployee = async (req, res) => {
    try {
        const employeeId = await Employee.addEmployee(req.body);
        res.status(201).json(employeeId);
    } catch (err) {
        res.status(500).send("Error adding employee");
    }
};

module.exports = {
    getEmployees,
    addEmployee,
    getEmployeeById,
    getManagers,
};
