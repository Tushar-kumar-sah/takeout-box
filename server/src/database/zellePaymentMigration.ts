import mysql from "mysql2/promise";
import { pool } from "../config/db.js";

/**
 * Migration for Zelle payment method support:
 * 1. Alter orders.payment_method to VARCHAR(50) so 'zelle' is valid.
 * 2. Add zelle_phone, zelle_reference_id, zelle_sender_name to orders table.
 * 3. Create zelle_payments table for transaction record and audit trail.
 */
export async function runZellePaymentMigration(): Promise<void> {
  let connection: mysql.PoolConnection | null = null;
  try {
    connection = await pool.getConnection();

    // Helper to check if column exists on a table
    const columnExists = async (tableName: string, colName: string): Promise<boolean> => {
      const [rows]: any = await connection!.query(
        `SELECT COUNT(*) as cnt FROM information_schema.COLUMNS 
         WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = ? AND COLUMN_NAME = ?`,
        [tableName, colName]
      );
      return rows[0]?.cnt > 0;
    };

    console.log("[Zelle Migration] Running Zelle database migrations...");

    // 1. Alter orders.payment_method to VARCHAR(50)
    try {
      await connection.query(`ALTER TABLE \`orders\` MODIFY COLUMN \`payment_method\` VARCHAR(50) NOT NULL DEFAULT 'zelle';`);
      console.log("[Zelle Migration] Modified orders.payment_method to VARCHAR(50)");
    } catch (err: any) {
      console.warn("[Zelle Migration] Warning modifying orders.payment_method:", err.message);
    }

    // 2. Add Zelle columns to orders table if not present
    const zelleOrderCols = [
      { name: "zelle_phone", def: "VARCHAR(30) NULL DEFAULT '(661) 805-9358'" },
      { name: "zelle_reference_id", def: "VARCHAR(100) NULL" },
      { name: "zelle_sender_name", def: "VARCHAR(100) NULL" },
    ];

    for (const col of zelleOrderCols) {
      if (!(await columnExists("orders", col.name))) {
        await connection.query(`ALTER TABLE \`orders\` ADD COLUMN \`${col.name}\` ${col.def};`);
        console.log(`[Zelle Migration] Added column orders.${col.name}`);
      }
    }

    // 3. Create zelle_payments table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS \`zelle_payments\` (
        \`id\` INT AUTO_INCREMENT NOT NULL,
        \`order_id\` VARCHAR(30) NOT NULL,
        \`recipient_phone\` VARCHAR(30) NOT NULL DEFAULT '(661) 805-9358',
        \`recipient_name\` VARCHAR(100) NOT NULL DEFAULT 'The Takeout Box',
        \`amount\` DECIMAL(10, 2) NOT NULL,
        \`currency\` VARCHAR(10) NOT NULL DEFAULT 'USD',
        \`reference_id\` VARCHAR(100) NOT NULL,
        \`sender_name\` VARCHAR(100) NULL,
        \`sender_phone\` VARCHAR(30) NULL,
        \`sender_email\` VARCHAR(120) NULL,
        \`status\` VARCHAR(50) NOT NULL DEFAULT 'pending',
        \`notes\` TEXT NULL,
        \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        \`updated_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        PRIMARY KEY (\`id\`),
        INDEX \`idx_zelle_order\` (\`order_id\`),
        INDEX \`idx_zelle_ref\` (\`reference_id\`),
        INDEX \`idx_zelle_status\` (\`status\`)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);
    console.log("[Zelle Migration] Verified/created zelle_payments table.");

  } catch (err: any) {
    console.error("[Zelle Migration Error]:", err.message);
    throw err;
  } finally {
    if (connection) {
      connection.release();
    }
  }
}
