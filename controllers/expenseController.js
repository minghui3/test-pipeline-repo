const Expense = require("../models/expense");

const getExpenses = async (req, res) => {
    try {
        const applierId = req.query.applierId; // Extract from query parameters
        const expenses = await Expense.getExpenses({ applierId }); // Pass as an object
        res.status(200).json(expenses);
    } catch (err) {
        res.status(500).send("Error fetching expenses");
    }
};

const getAllExpenses = async (req, res) => {
    try {
        const expenses = await Expense.getAllExpenses(); // Fetch all expenses
        res.status(200).json(expenses);
    } catch (err) {
        console.error(err); // Log the error for debugging
        res.status(500).send("Error fetching expenses");
    }
};

const addExpense = async (req, res) => {
    try {
        const expenseId = await Expense.addExpense(req.body);
        res.status(201).json(expenseId);
    } catch (err) {
        res.status(500).send("Error adding expense");
    }
};

const updateExpenseStatus = async (req, res) => {
    try {
        const expenseId = req.params.id; // Get expense ID from URL params
        const updatedExpense = await Expense.updateExpenseStatus(req.body,expenseId); // Pass the ID and body
        res.status(200).json(updatedExpense); // Send back the updated expense
    } catch (err) {
        console.error(err); // Log the error for debugging
        res.status(500).send("Error updating expense");
    }
};

module.exports = {
    getExpenses,
    addExpense,
    getAllExpenses,
    updateExpenseStatus,
};
