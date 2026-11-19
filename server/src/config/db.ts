import mysql from "mysql2/promise";
import { ENV } from "./env.js";

// Create MySQL connection pool
export const pool = mysql.createPool({
  host: ENV.DB_HOST,
  port: ENV.DB_PORT,
  user: ENV.DB_USER,
  password: ENV.DB_PASSWORD,
  database: ENV.DB_NAME,
  waitForConnections: true,
  connectionLimit: ENV.DB_CONNECTION_LIMIT,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 10000,
});

/**
 * Tests database connectivity and logs status
 */
export async function testDbConnection(): Promise<boolean> {
  try {
    const connection = await pool.getConnection();
    await connection.ping();
    connection.release();
    console.log(`[Database] Connected successfully to MySQL database "${ENV.DB_NAME}" at ${ENV.DB_HOST}:${ENV.DB_PORT}`);
    return true;
  } catch (error: any) {
    console.warn(`[Database Warning] Could not connect to MySQL database "${ENV.DB_NAME}": ${error.message}`);
    console.warn(`[Database Notice] Please verify your DB credentials in server/.env (DB_USER, DB_PASSWORD, DB_NAME).`);
    return false;
  }
}
