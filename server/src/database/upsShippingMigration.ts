import mysql from "mysql2/promise";
import { pool } from "../config/db.js";

/**
 * Migration helper to ensure UPS shipping schema fields are present
 * on products, product_sizes, orders, and order_shipments tables.
 */
export async function runUpsShippingMigration(): Promise<void> {
  const connection = await pool.getConnection();
  try {
    console.log("[UPS Migration] Checking schema for UPS shipping columns...");

    // Helper to check if a column exists
    const columnExists = async (table: string, column: string): Promise<boolean> => {
      const [rows]: any = await connection.query(
        `SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = ? AND COLUMN_NAME = ?`,
        [table, column]
      );
      return rows && rows.length > 0;
    };

    // 1. Alter products table
    const productFields = [
      { name: "weight", def: "DECIMAL(8, 2) NOT NULL DEFAULT 2.00" },
      { name: "weight_unit", def: "VARCHAR(10) NOT NULL DEFAULT 'LBS'" },
      { name: "length", def: "DECIMAL(8, 2) NOT NULL DEFAULT 12.00" },
      { name: "width", def: "DECIMAL(8, 2) NOT NULL DEFAULT 8.00" },
      { name: "height", def: "DECIMAL(8, 2) NOT NULL DEFAULT 5.00" },
      { name: "dimension_unit", def: "VARCHAR(10) NOT NULL DEFAULT 'IN'" },
      { name: "is_shippable", def: "BOOLEAN NOT NULL DEFAULT TRUE" },
    ];

    for (const field of productFields) {
      if (!(await columnExists("products", field.name))) {
        await connection.query(`ALTER TABLE \`products\` ADD COLUMN \`${field.name}\` ${field.def};`);
        console.log(`[UPS Migration] Added column products.${field.name}`);
      }
    }

    // 2. Alter product_sizes table
    const sizeFields = [
      { name: "weight", def: "DECIMAL(8, 2) NULL" },
      { name: "weight_unit", def: "VARCHAR(10) NOT NULL DEFAULT 'LBS'" },
      { name: "length", def: "DECIMAL(8, 2) NULL" },
      { name: "width", def: "DECIMAL(8, 2) NULL" },
      { name: "height", def: "DECIMAL(8, 2) NULL" },
      { name: "dimension_unit", def: "VARCHAR(10) NOT NULL DEFAULT 'IN'" },
    ];

    for (const field of sizeFields) {
      if (!(await columnExists("product_sizes", field.name))) {
        await connection.query(`ALTER TABLE \`product_sizes\` ADD COLUMN \`${field.name}\` ${field.def};`);
        console.log(`[UPS Migration] Added column product_sizes.${field.name}`);
      }
    }

    // 3. Alter orders table
    const orderFields = [
      { name: "shipping_carrier", def: "VARCHAR(50) NOT NULL DEFAULT 'UPS'" },
      { name: "shipping_service", def: "VARCHAR(100) NULL" },
      { name: "shipping_service_code", def: "VARCHAR(50) NULL" },
      { name: "shipping_amount", def: "DECIMAL(10, 2) NOT NULL DEFAULT 0.00" },
      { name: "shipping_currency", def: "VARCHAR(10) NOT NULL DEFAULT 'USD'" },
      { name: "shipping_first_name", def: "VARCHAR(100) NULL" },
      { name: "shipping_last_name", def: "VARCHAR(100) NULL" },
      { name: "shipping_address_line1", def: "VARCHAR(255) NULL" },
      { name: "shipping_address_line2", def: "VARCHAR(80) NULL" },
      { name: "shipping_city", def: "VARCHAR(80) NULL" },
      { name: "shipping_state", def: "VARCHAR(10) NULL" },
      { name: "shipping_zip", def: "VARCHAR(15) NULL" },
      { name: "shipping_country", def: "VARCHAR(50) NOT NULL DEFAULT 'United States'" },
      { name: "rate_quote_reference", def: "VARCHAR(255) NULL" },
    ];

    for (const field of orderFields) {
      if (!(await columnExists("orders", field.name))) {
        await connection.query(`ALTER TABLE \`orders\` ADD COLUMN \`${field.name}\` ${field.def};`);
        console.log(`[UPS Migration] Added column orders.${field.name}`);
      }
    }

    // Relax payment_status & status enum to support NOT_STARTED and shipping workflow statuses
    try {
      await connection.query(`ALTER TABLE \`orders\` MODIFY COLUMN \`payment_status\` VARCHAR(50) DEFAULT 'NOT_STARTED';`);
      await connection.query(`ALTER TABLE \`orders\` MODIFY COLUMN \`status\` VARCHAR(50) DEFAULT 'ORDER_CREATED';`);
    } catch (err: any) {
      console.warn(`[UPS Migration] Notice updating orders status column:`, err.message);
    }

    // 4. Create order_shipments table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS \`order_shipments\` (
        \`id\` INT AUTO_INCREMENT NOT NULL,
        \`order_id\` VARCHAR(30) NOT NULL,
        \`carrier\` VARCHAR(50) NOT NULL DEFAULT 'UPS',
        \`service_code\` VARCHAR(50) NOT NULL,
        \`service_name\` VARCHAR(100) NOT NULL,
        \`origin_address\` JSON NULL,
        \`destination_address\` JSON NULL,
        \`package_weight\` DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
        \`package_weight_unit\` VARCHAR(10) NOT NULL DEFAULT 'LBS',
        \`package_length\` DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
        \`package_width\` DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
        \`package_height\` DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
        \`package_dimension_unit\` VARCHAR(10) NOT NULL DEFAULT 'IN',
        \`shipping_amount\` DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
        \`currency\` VARCHAR(10) NOT NULL DEFAULT 'USD',
        \`rate_quote_reference\` VARCHAR(255) NULL,
        \`tracking_number\` VARCHAR(100) NULL,
        \`ups_shipment_id\` VARCHAR(100) NULL,
        \`shipment_status\` VARCHAR(50) NOT NULL DEFAULT 'RATE_SELECTED',
        \`estimated_delivery_date\` VARCHAR(100) NULL,
        \`shipped_at\` TIMESTAMP NULL,
        \`delivered_at\` TIMESTAMP NULL,
        \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        \`updated_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        PRIMARY KEY (\`id\`),
        FOREIGN KEY (\`order_id\`) REFERENCES \`orders\`(\`id\`) ON DELETE CASCADE,
        INDEX \`idx_shipments_order\` (\`order_id\`),
        INDEX \`idx_shipments_tracking\` (\`tracking_number\`)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);
    console.log("[UPS Migration] Verified order_shipments table is ready.");

  } catch (error: any) {
    console.error("[UPS Migration Error]", error);
    throw error;
  } finally {
    connection.release();
  }
}

// Execute directly if run via CLI
if (process.argv[1]?.includes("upsShippingMigration")) {
  runUpsShippingMigration()
    .then(() => {
      console.log("[UPS Migration] Completed successfully.");
      process.exit(0);
    })
    .catch((err) => {
      console.error("[UPS Migration Failed]", err);
      process.exit(1);
    });
}

