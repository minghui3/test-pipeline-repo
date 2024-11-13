const { readFileSync } = require("fs");
const pool = require("./pool");
const create = readFileSync("./database/seed/create.sql");
const triggers = readFileSync("./database/seed/trigger.sql");
const insertLeaves = readFileSync("./database/seed/leave.sql");
const insertExpenses = readFileSync("./database/seed/expense.sql");
const insertManagers = readFileSync("./database/seed/manager.sql");
const insertEmployees = readFileSync("./database/seed/employee.sql");

pool.on("connect", async (client) => {
    try {
        // start transaction
        await client.query("BEGIN;");

        // delete existing tables and re-create
        await client.query(create.toString());

        // insert managers
        const managerResult = await client.query(insertManagers.toString());

        // get managers' ids
        const managers = managerResult.rows.map((row) => row.employee_id);
        console.log("Manager IDs: ", managers);

        // insert employees who have managers
        const employeeResult = await client.query(
            insertEmployees.toString(),
            managers
        );

        // get employees' ids
        const employees = employeeResult.rows.map((row) => row.employee_id);
        console.log("Employee IDs: ", employees);

        // set triggers
        await client.query(triggers.toString());

        // insert leaves
        await client.query(insertLeaves.toString(), employees);

        // insert expenses
        await client.query(insertExpenses.toString(), employees);

        // commit transaction if no errors
        await client.query("COMMIT;");
        console.log("Seeding successful");
    } catch (err) {
        console.error("Seeding error: ", err);
    } finally {
        client.release();
        pool.end();
    }
});

pool.connect();
