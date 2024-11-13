require("dotenv").config();

const config = {
    uri: process.env.MONGOURI,
    database: process.env.MONGODB,
    collection: process.env.MONGOCOLLECTION,
};

module.exports = config ;