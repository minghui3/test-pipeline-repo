const express = require("express");
const bodyParser = require("body-parser");
const employeeRoutes = require("./routes/employeeRoute");
const expenseRoutes = require("./routes/expenseRoute");

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use("/", employeeRoutes);
app.use("/", expenseRoutes);

app.listen(port, async () => {
    console.log(`Server running at http://localhost:${port}`);
});

process.on("SIGINT", async () => {
    console.log(`Server closing gracefully`);
    pool.end();
    console.log(`Closing pg pool`);
    process.exit(0);
});
