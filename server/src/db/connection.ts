import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

export default mysql.createPool({
  host:
    process.env.NODE_ENV == "production" ? "RDS endpoint" : process.env.DB_HOST,
  user:
    process.env.NODE_ENV == "production" ? "RDS endpoint" : process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port:
    typeof process.env.DB_PORT == "string"
      ? parseInt(process.env.DB_PORT)
      : process.env.DB_PORT,
  database: process.env.DB_SCHEMA,
});
