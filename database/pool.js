const { Pool } = require('pg');
const dbConfig = require('../config/postgres.config');

const pool = new Pool(dbConfig);

module.exports = pool;