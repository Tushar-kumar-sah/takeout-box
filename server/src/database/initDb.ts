import fs from "fs";
import path from "path";
import mysql from "mysql2/promise";
import { ENV } from "../config/env.js";

/**
 * Executes schema.sql to create database and tables
 */
export async function initializeDatabase(): Promise<boolean> {
  let connection: mysql.Connection | null = null;
  try {
    // 1. Connect without selecting database first to create database if not exists
    connection = await mysql.createConnection({
      host: ENV.DB_HOST,
      port: ENV.DB_PORT,
      user: ENV.DB_USER,
      password: ENV.DB_PASSWORD,
      multipleStatements: true,
    });

    const schemaPath = path.resolve(process.cwd(), "src/database/schema.sql");
    const sql = fs.readFileSync(schemaPath, "utf-8");

    console.log(`[Database Init] Running schema DDL migrations on MySQL...`);
    await connection.query(sql);

    // Apply incremental column alterations for existing users table
    try {
      await connection.query(`USE \`${ENV.DB_NAME}\`;`);
      
      // 1. Add password_hash column if not present
      const [cols]: any = await connection.query(`SHOW COLUMNS FROM \`users\` LIKE 'password_hash';`);
      if (!cols || cols.length === 0) {
        await connection.query(`ALTER TABLE \`users\` ADD COLUMN \`password_hash\` VARCHAR(255) NULL AFTER \`email\`;`);
        console.log(`[Database Init] Added column "password_hash" to users table.`);
      }

      // 2. Make firebase_uid nullable if it was NOT NULL
      try {
        await connection.query(`ALTER TABLE \`users\` MODIFY COLUMN \`firebase_uid\` VARCHAR(128) NULL;`);
      } catch {}

      // 3. Update login_type enum if needed
      try {
        await connection.query(`ALTER TABLE \`users\` MODIFY COLUMN \`login_type\` ENUM('email_password', 'google', 'phone_otp', 'apple', 'guest') DEFAULT 'email_password';`);
      } catch {}
    } catch (migErr: any) {
      console.warn(`[Database Init] Incremental migration notice: ${migErr.message}`);
    }

    // Run UPS shipping column & table migrations
    try {
      const { runUpsShippingMigration } = await import("./upsShippingMigration.js");
      await runUpsShippingMigration();
    } catch (upsMigErr: any) {
      console.warn(`[Database Init] UPS migration notice: ${upsMigErr.message}`);
    }

    // Run Zelle payment column & table migrations
    try {
      const { runZellePaymentMigration } = await import("./zellePaymentMigration.js");
      await runZellePaymentMigration();
    } catch (zelleMigErr: any) {
      console.warn(`[Database Init] Zelle migration notice: ${zelleMigErr.message}`);
    }

    console.log(`[Database Init] Database "${ENV.DB_NAME}" and all tables initialized successfully.`);
    return true;
  } catch (error: any) {
    console.warn(`[Database Init Warning] Could not run schema migrations: ${error.message}`);
    console.warn(`[Database Init Notice] Ensure MySQL server is running at ${ENV.DB_HOST}:${ENV.DB_PORT} with user "${ENV.DB_USER}".`);
    return false;
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

// Execute directly if run as CLI script
if (process.argv[1]?.includes("initDb")) {
  initializeDatabase().then(() => process.exit(0));
}
