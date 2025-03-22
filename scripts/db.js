const { execSync } = require('node:child_process');
const dotenv = require('dotenv').config().parsed;

const url = {
  user: dotenv.POSTGRES_USER,
  password: dotenv.POSTGRES_PASSWORD,
  host: dotenv.POSTGRES_HOST,
  port: dotenv.POSTGRES_PORT,
  database: dotenv.POSTGRES_DB
};

process.env.DATABASE_URL = `postgresql://${url.user}:${url.password}@${url.host}:${url.port}/${url.database}?schema=public`;

const command = process.argv.slice(2).join(' ');
if (command) execSync(command, { stdio: 'inherit', env: process.env });
