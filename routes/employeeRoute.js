const express = require("express");
const controller = require("../controllers/employeeController");

const router = express.Router();

router.get("/employee", controller.getEmployees);
router.post("/employee", controller.addEmployee);
router.post("/login", controller.employeeLogin);
router.get("/employee/:employeeId", controller.getEmployeeById);
router.get("/manager",controller.getManagers)

module.exports = router;
