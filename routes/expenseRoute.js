const express = require("express");
const controller = require("../controllers/expenseController");

const router = express.Router();

router.get("/expense", controller.getExpenses);
router.post("/expense", controller.addExpense);

module.exports = router;
