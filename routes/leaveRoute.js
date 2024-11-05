const express = require("express");
const controller = require("../controllers/leaveController");

const router = express.Router();

router.get("/leave", controller.getLeaves);
router.post("/leave", controller.addLeave);
router.get("/all-leave",controller.getAllLeaves)
router.put("/leave/:id",controller.updateLeaveStatus)


module.exports = router;
