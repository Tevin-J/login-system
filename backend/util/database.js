import * as mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();
const config = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

export const pool = mysql.createConnection(config).promise();
