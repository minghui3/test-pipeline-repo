const express = require("express");
const controller = require("../controllers/leaveController");

const router = express.Router();

router.get("/leave", controller.getLeaves);
router.post("/leave", controller.addLeave);

module.exports = router;
