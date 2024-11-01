const express = require('express');
const { Pool } = require('pg');
const dbConfig = require('dbConfig');

const app = express();
const port = 3000;
 
const pool = new Pool(dbConfig);

