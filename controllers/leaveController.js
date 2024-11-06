const Leave = require("../models/leave");

const getLeaves = async (req, res) => {
    try {
        const applierId = req.query.applierId; // Extract from query parameters
        const leaves = await Leave.getLeaves({ applierId }); // Pass as an object
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

const getAllLeaves = async (req, res) => {
    try {
        const leaves = await Leave.getAllLeaves();
        res.status(200).json(leaves);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error fetching all leaves");
    }
};

const updateLeaveStatus = async (req, res) => {
    try {
        const leaveId = req.params.id; // Get leave ID from URL params
        const updatedLeave = await Leave.updateLeaveStatus(req.body,leaveId); // Pass the ID and body
        res.status(200).json(updatedLeave); // Send back the updated leave
    } catch (err) {
        console.error(err); // Log the error for debugging
        res.status(500).send("Error updating leave");
    }
};


module.exports = {
    getLeaves,
    addLeave,
    getAllLeaves,
    updateLeaveStatus,
};
