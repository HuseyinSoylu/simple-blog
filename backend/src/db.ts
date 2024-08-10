import { Pool } from "pg";
import dotenv from "dotenv";
import logger from "./logger";

dotenv.config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
});

pool.on("connect", () => {
  logger.info("Connected to the PostgreSQL database.");
});

pool.on("error", (err) => {
  logger.error(`Database error: ${err.message}`);
});

export default pool;
