import dotenv from 'dotenv';
dotenv.config();

const envs = {
  PORT: process.env.PORT,
  DB_HOST: process.env.DB_HOST,
  DB_PORT: process.env.DB_PORT,
  DB_USERNAME: process.env.DB_USERNAME,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_NAME: process.env.DB_NAME,
};
export function getEnv(name) {
  const v = envs[name] || process.env[name];
  if (!v) {
    throw new Error(`Missing environment variable ${name}`);
  }
  return v;
}
