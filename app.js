const express = require("express");
const bodyParser = require("body-parser");
const employeeRoutes = require("./routes/employeeRoute");
const expenseRoutes = require("./routes/expenseRoute");
const leaveRoutes = require("./routes/leaveRoute");
const pool = require("./database/pool"); 

const employeeController = require("./controllers/employeeController")
const expenseController = require("./controllers/expenseController")
const leaveController = require("./controllers/leaveController")

const app = express();
const port = 3001;

app.use(express.static("public"));
app.use(bodyParser.json());
app.use("/", employeeRoutes);
app.use("/", expenseRoutes);
app.use("/", leaveRoutes);

app.listen(port, async () => {
    console.log(`Server running at http://localhost:${port}`);
});

process.on("SIGINT", async () => {
    console.log(`Server closing gracefully`);
    pool.end();
    console.log(`Closing pg pool`);
    process.exit(0);
});
