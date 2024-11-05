const express = require("express");
const controller = require("../controllers/employeeController");

const router = express.Router();

router.get("/employee", controller.getEmployees);
router.post("/employee", controller.addEmployee);
router.get("/employee/:employeeId", controller.getEmployeeById);

module.exports = router;
