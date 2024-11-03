const express = require("express");
const controller = require("../controllers/employeeController");

const router = express.Router();

router.get("/employee", controller.getEmployees);
router.post("/employee", controller.addEmployee);

module.exports = router;
