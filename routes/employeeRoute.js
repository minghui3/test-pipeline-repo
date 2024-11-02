const express = require("express");
const router = express.Router();
const controller = require("../controllers/employeeController");

router.get("/employee", controller.getEmployees);
router.post("/employee", controller.addEmployee);

module.exports = router;
