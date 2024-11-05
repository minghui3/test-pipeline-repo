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

const addExpense = async (req, res) => {
    try {
        const expenseId = await Expense.addExpense(req.body);
        res.status(201).json(expenseId);
    } catch (err) {
        res.status(500).send("Error adding expense");
    }
};

module.exports = {
    getExpenses,
    addExpense,
};
