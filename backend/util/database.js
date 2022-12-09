import * as mysql from 'mysql2';
import { getEnv } from '../helper/environment.js';

const config = {
  host: getEnv('DB_HOST'),
  port: getEnv('DB_PORT'),
  user: getEnv('DB_USERNAME'),
  password: getEnv('DB_PASSWORD'),
  database: getEnv('DB_NAME'),
};

export const pool = mysql.createPool(config).promise();
