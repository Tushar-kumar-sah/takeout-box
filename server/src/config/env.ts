import dotenv from "dotenv";
import path from "path";
import fs from "fs";

// Reliably resolve directory of this config module in Node CommonJS/ESM
const currentDir = typeof __dirname !== "undefined" ? __dirname : process.cwd();

// Prioritized list of paths to look for .env (checks server/.env first, then root .env)
const candidateEnvPaths = [
  path.resolve(currentDir, "../../.env"),           // server/.env (from src/config or dist/config)
  path.resolve(process.cwd(), "server", ".env"),   // when running from workspace root
  path.resolve(process.cwd(), ".env"),            // when running from server/ directory
  path.resolve(currentDir, "../../../.env"),
];

let loadedEnvPath: string | null = null;
for (const envPath of candidateEnvPaths) {
  if (fs.existsSync(envPath)) {
    dotenv.config({ path: envPath });
    loadedEnvPath = envPath;
    break;
  }
}

if (!loadedEnvPath) {
  dotenv.config(); // fallback default
}


export const ENV = {
  PORT: parseInt(process.env.PORT || "5000", 10),
  NODE_ENV: process.env.NODE_ENV || "development",
  CLIENT_ORIGIN: process.env.CLIENT_ORIGIN || "http://localhost:3000",

  // MySQL Database
  DB_HOST: process.env.DB_HOST || "localhost",
  DB_PORT: parseInt(process.env.DB_PORT || "3306", 10),
  DB_USER: process.env.DB_USER || "root",
  DB_PASSWORD: process.env.DB_PASSWORD || "",
  DB_NAME: process.env.DB_NAME || "takeout_box_db",
  DB_CONNECTION_LIMIT: parseInt(process.env.DB_CONNECTION_LIMIT || "10", 10),

  // JWT
  JWT_SECRET: process.env.JWT_SECRET || "takeout_box_jwt_default_secret_2026",
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "1h",
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || "takeout_box_refresh_default_secret_2026",
  JWT_REFRESH_EXPIRES_IN: process.env.JWT_REFRESH_EXPIRES_IN || "30d",

  // Admin Credentials
  ADMIN_EMAIL: process.env.ADMIN_EMAIL || "admin@thetakeoutbox.com",
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD || "TakeoutAdmin2026!",

  // Depot Settings
  DEPOT_ADDRESS: process.env.DEPOT_ADDRESS || "5880 District Blvd. Suite 17, Bakersfield, CA 93313",
  DEPOT_PHONE_1: process.env.DEPOT_PHONE_1 || "+1 661-205-9667",
  DEPOT_PHONE_2: process.env.DEPOT_PHONE_2 || "+1 661-805-9358",
  CALIFORNIA_SALES_TAX_RATE: parseFloat(process.env.CALIFORNIA_SALES_TAX_RATE || "0.0825"),

  // Google OAuth Credentials
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID || "",
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET || "",

  // UPS Courier Shipping Credentials (OAuth 2.0 RESTful)
  UPS_ENVIRONMENT: process.env.UPS_ENVIRONMENT || "sandbox",
  UPS_CLIENT_ID: process.env.UPS_CLIENT_ID || "",
  UPS_CLIENT_SECRET: process.env.UPS_CLIENT_SECRET || "",
  UPS_ACCOUNT_NUMBER: process.env.UPS_ACCOUNT_NUMBER || "",
  UPS_SHIP_FROM_COMPANY: process.env.UPS_SHIP_FROM_COMPANY || "The Takeout Box Restaurant Supply LLC",
  UPS_SHIP_FROM_ADDRESS: process.env.UPS_SHIP_FROM_ADDRESS || process.env.UPS_ORIGIN_STREET || "5880 District Blvd. Suite 17",
  UPS_SHIP_FROM_CITY: process.env.UPS_SHIP_FROM_CITY || process.env.UPS_ORIGIN_CITY || "Bakersfield",
  UPS_SHIP_FROM_STATE: process.env.UPS_SHIP_FROM_STATE || process.env.UPS_ORIGIN_STATE || "CA",
  UPS_SHIP_FROM_ZIP: process.env.UPS_SHIP_FROM_ZIP || process.env.UPS_ORIGIN_ZIP || "93313",
  UPS_SHIP_FROM_COUNTRY: process.env.UPS_SHIP_FROM_COUNTRY || process.env.UPS_ORIGIN_COUNTRY || "US",
  UPS_ORIGIN_STREET: process.env.UPS_ORIGIN_STREET || process.env.UPS_SHIP_FROM_ADDRESS || "5880 District Blvd. Suite 17",
  UPS_ORIGIN_CITY: process.env.UPS_ORIGIN_CITY || process.env.UPS_SHIP_FROM_CITY || "Bakersfield",
  UPS_ORIGIN_STATE: process.env.UPS_ORIGIN_STATE || process.env.UPS_SHIP_FROM_STATE || "CA",
  UPS_ORIGIN_ZIP: process.env.UPS_ORIGIN_ZIP || process.env.UPS_SHIP_FROM_ZIP || "93313",
  UPS_ORIGIN_COUNTRY: process.env.UPS_ORIGIN_COUNTRY || process.env.UPS_SHIP_FROM_COUNTRY || "US",

  // Zelle Commercial Account Settings
  ZELLE_BUSINESS_NAME: process.env.ZELLE_BUSINESS_NAME || "The Takeout Box Restaurant Supply LLC",
  ZELLE_EMAIL: process.env.ZELLE_EMAIL || "billing@thetakeoutbox.com",
  ZELLE_PHONE: process.env.ZELLE_PHONE || "+1 661-205-9667",

  // SMTP Email Configuration
  SMTP_HOST: process.env.SMTP_HOST || "",
  SMTP_PORT: parseInt(process.env.SMTP_PORT || "587", 10),
  SMTP_SECURE: process.env.SMTP_SECURE === "true",
  SMTP_USER: process.env.SMTP_USER || "",
  SMTP_PASS: process.env.SMTP_PASS || "",
  EMAIL_FROM: process.env.EMAIL_FROM || '"The Takeout Box Depot" <orders@thetakeoutbox.com>',
  ADMIN_NOTIFICATION_EMAIL: process.env.ADMIN_NOTIFICATION_EMAIL || "admin@thetakeoutbox.com",

  // WhatsApp Business Configuration
  WHATSAPP_PHONE_NUMBER: process.env.WHATSAPP_PHONE_NUMBER || "16612059667",
  WHATSAPP_API_TOKEN: process.env.WHATSAPP_API_TOKEN || "",
  WHATSAPP_PHONE_NUMBER_ID: process.env.WHATSAPP_PHONE_NUMBER_ID || "",

  // AI Chatbot Configuration
  GEMINI_API_KEY: process.env.GEMINI_API_KEY || "",
  OPENAI_API_KEY: process.env.OPENAI_API_KEY || "",
};

/**
 * Safely inspect UPS configuration state without leaking secret credentials.
 */
export function getUpsConfigStatus() {
  return {
    environment: ENV.UPS_ENVIRONMENT || "sandbox",
    clientIdConfigured: Boolean(ENV.UPS_CLIENT_ID && ENV.UPS_CLIENT_ID.trim().length > 0),
    clientSecretConfigured: Boolean(ENV.UPS_CLIENT_SECRET && ENV.UPS_CLIENT_SECRET.trim().length > 0),
    accountConfigured: Boolean(ENV.UPS_ACCOUNT_NUMBER && ENV.UPS_ACCOUNT_NUMBER.trim().length > 0),
  };
}


