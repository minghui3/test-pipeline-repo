const Leave = require("../models/leave");

const getLeaves = async (req, res) => {
    try {
        const leaves = await Leave.getLeaves(req.body);
        res.status(200).json(leaves);
    } catch (err) {
        res.status(500).send("Error fetching leaves");
    }
};

const addLeave = async (req, res) => {
    try {
        const leaveId = await Leave.addLeave(req.body);
        res.status(201).json(leaveId);
    } catch (err) {
        res.status(500).send("Error adding leave");
    }
};

module.exports = {
    getLeaves,
    addLeave,
};
