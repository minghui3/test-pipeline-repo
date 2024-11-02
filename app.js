const express = require("express");
const bodyParser = require("body-parser");
const employeeRoutes = require("./routes/employeeRoute");
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use("/", employeeRoutes);

app.listen(port, async () => {
    console.log(`Server running at http://localhost:${port}`);
});

process.on("SIGINT", async () => {
    console.log(`Server closing gracefully`);
    process.exit(0);
});
