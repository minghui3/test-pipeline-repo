const { MongoClient } = require("mongodb");
const { v4 } = require("uuid");
const fs = require("fs");
const dbConfig = require("../config/mongodb.config");

const client = new MongoClient(dbConfig.uri); 
async function main() {
    const browsers = ['chrome', 'firefox', 'edge'];
    console.log(dbConfig.uri);
    await client.connect();
    const database = client.db(dbConfig.database);

    for (const browser of browsers) {
        const resultPath = "./maven/target/cucumber-reports/" + browser + "-report.json";
        console.log(resultPath);
        if (fs.existsSync(resultPath)) {
            console.log("here");
            const collection = database.collection(dbConfig.collection + "_" + browser);
            const uuid = v4();
            const testResult = JSON.parse(fs.readFileSync(resultPath))
            const result = await collection.insertOne({ uuid: testResult});
            console.log(result);
        }
    }
    await client.close();
}

main();