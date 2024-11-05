const pool = require("../database/pool");

/**
 * @typedef {Object} Expense
 * @property {string} expenseId
 * @property {string} type
 * @property {Date} dateOfExpense
 * @property {number} amount
 * @property {string} status
 * @property {string} expenseReason
 * @property {string} applierId
 * @property {string} approverid
 * @property {string} supportingDocumentPath
 * @property {string} rejectionReason
 */
class Expense {
    /**
     * Retrieves every expense that belongs to employee specified in body
     *
     * @param {Object} body HTML body containing applierId
     *
     * @returns {Array<Expense>} An array of objects that each represents an expense
     */
    static async getExpenses(body) {
        try {
            const result = await pool.query(
                `SELECT * FROM expenses WHERE applier_id = $1;`,
                [body.applierId]
            );
            return result.rows.map((row) => ({
                expenseId: row.expense_id,
                type: row.type,
                dateOfExpense: row.date_of_expense,
                amount: row.amount,
                status: row.status,
                expenseReason: row.expense_reason,
                applierId: row.applier_id,
                approverId: row.approver_id,
                supportingDocumentPath: row.supporting_document_path,
                rejectionReason: row.rejection_reason,
            }));
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

        /**
     * Retrieves all expenses from the database
     *
     * @returns {Array<Expense>} An array of objects that each represents an expense
     */
    static async getAllExpenses() {
        try {
            const result = await pool.query(`SELECT * FROM expenses;`);
            return result.rows.map((row) => ({
                expenseId: row.expense_id,
                type: row.type,
                dateOfExpense: row.date_of_expense,
                amount: row.amount,
                status: row.status,
                expenseReason: row.expense_reason,
                applierId: row.applier_id,
                approverId: row.approver_id,
                supportingDocumentPath: row.supporting_document_path,
                rejectionReason: row.rejection_reason,
            }));
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

        /**
     * Updates the status of an existing expense in the database
     *
     * @param {Object} body HTML body containing the new status
     * @param {string} expenseId The ID of the expense to update
     *
     * @returns {Object} The updated expense details
     */
    static async updateExpenseStatus(body, expenseId) {
        try {
            const sqlQuery = `
                UPDATE expenses
                SET status = $1
                WHERE expense_id = $2
                RETURNING expense_id, status;
            `;
            const values = [
                body.status, // Update only the status
                expenseId,
            ];
            const result = await pool.query(sqlQuery, values);
            return {
                expenseId: result.rows[0].expense_id,
                status: result.rows[0].status,
            };
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    /**
     * Adds a new expense into the database.
     *
     * @param {Object} HTML body containing attributes of new expense
     *
     * @returns {Object} ID of new expense
     */
    static async addExpense(body) {
        try {
            const sqlQuery = `
                INSERT INTO expenses (
                type, date_of_expense, amount, status,
                expense_reason, applier_id, approver_id,
                supporting_document_path, rejection_reason)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
                RETURNING expense_id;
            `;
            const values = [
                body.type,
                body.dateOfExpense,
                body.amount,
                body.status,
                body.expenseReason,
                body.applierId,
                body.approverId,
                body.supportingDocumentPath,
                body.rejectionReason,
            ];
            const result = await pool.query(sqlQuery, values);
            return { expenseId: result.rows[0].expense_id };
        } catch (err) {
            console.error(err);
            throw err;
        }
    }
}

module.exports = Expense;
