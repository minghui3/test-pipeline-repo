const pool = require("../database/pool");

/**
 * @typedef {Object} Leave
 * @property {string} leaveId
 * @property {string} type
 * @property {Date} dateStart
 * @property {Date} dateEnd
 * @property {string} status
 * @property {string} applierId
 * @property {string} approverid
 * @property {string} leaveReason
 * @property {string} rejectionReason
 */
class Leave {
    /**
     * Retrieves every leave that belongs to the employee specified in body
     *
     * @param {Object} body HTML body containing applierId
     *
     * @returns {Array<Leave>} An array of objects that each represents a leave
     */
    static async getLeaves(body) {
        try {
            const result = await pool.query(
                `SELECT * FROM leaves WHERE applier_id = $1;`,
                [body.applierId]
            );
            return result.rows.map((row) => ({
                leaveId: row.leave_id,
                type: row.type,
                dateStart: row.date_start,
                dateEnd: row.date_end,
                status: row.status,
                applierId: row.applier_id,
                approverId: row.approver_id,
                leaveReason: row.leave_reason,
                rejectionReason: row.rejection_reason,
            }));
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    /**
     * Retrieves all leaves from the database
     *
     * @returns {Array<Leave>} An array of objects that represent all leaves
     */
    static async getAllLeaves() {
        try {
            const result = await pool.query(`SELECT * FROM leaves;`);
            return result.rows.map((row) => ({
                leaveId: row.leave_id,
                type: row.type,
                dateStart: row.date_start,
                dateEnd: row.date_end,
                status: row.status,
                applierId: row.applier_id,
                approverId: row.approver_id,
                leaveReason: row.leave_reason,
                rejectionReason: row.rejection_reason,
            }));
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    /**
     * Updates an existing leave in the database
     *
     * @param {Object} body HTML body containing the attributes to update
     * @param {string} leaveId The ID of the leave to update
     *
     * @returns {Object} The updated leave details
     */
    static async updateLeaveStatus(body, leaveId) {
    try {
        const sqlQuery = `
            UPDATE leaves
            SET status = $1
            WHERE leave_id = $2
            RETURNING leave_id, status;
        `;
        const values = [
            body.status, // Update only the status
            leaveId,
        ];
        const result = await pool.query(sqlQuery, values);
        return {
            leaveId: result.rows[0].leave_id,
            status: result.rows[0].status,
        };
    } catch (err) {
        console.error(err);
        throw err;
    }
}

    /**
     * Adds a new leave into the database
     *
     * @param {Object} body HTML body containing attributes for new leave
     *
     * @returns {Object} ID of new leave
     */
    static async addLeave(body) {
        try {
            const sqlQuery = `
                INSERT INTO leaves (
                type, date_start, date_end, status,
                applier_id, approver_id, leave_reason,
                supporting_document_path, rejection_reason)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
                RETURNING leave_id;
            `;
            const values = [
                body.type,
                body.dateStart,
                body.dateEnd,
                body.status,
                body.applierId,
                body.approverId,
                body.leaveReason,
                body.supportingDocumentPath,
                body.rejectionReason,
            ];
            const result = await pool.query(sqlQuery, values);
            return { leaveId: result.rows[0].leave_id };
        } catch (err) {
            console.error(err);
            throw err;
        }
    }
}

module.exports = Leave;
