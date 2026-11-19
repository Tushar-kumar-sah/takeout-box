import { app } from "./app.js";
import { ENV } from "./config/env.js";
import { testDbConnection } from "./config/db.js";
import { initializeDatabase } from "./database/initDb.js";
import { seedDatabase } from "./database/seed.js";
import { EmailService } from "./services/emailService.js";
import fs from "fs";
import path from "path";

/**
 * Automatically publishes the active backend port and API URL to the frontend
 * (public/api-config.json and .env.local) so the frontend dynamically connects to
 * whatever port the backend runs on.
 */
function syncFrontendApiConfig(port: number) {
  try {
    const currentDir = typeof __dirname !== "undefined" ? __dirname : process.cwd();
    const candidatePublicDirs = [
      path.resolve(currentDir, "../../public"),
      path.resolve(process.cwd(), "public"),
      path.resolve(process.cwd(), "../public"),
    ];

    const configData = JSON.stringify(
      {
        port,
        apiUrl: `http://localhost:${port}/api/v1`,
        updatedAt: new Date().toISOString(),
      },
      null,
      2
    );

    for (const pubDir of candidatePublicDirs) {
      if (fs.existsSync(pubDir)) {
        const configPath = path.join(pubDir, "api-config.json");
        fs.writeFileSync(configPath, configData, "utf8");
        console.log(`[Dynamic Config] Synced active API URL (http://localhost:${port}/api/v1) to ${configPath}`);
        break;
      }
    }

    const candidateEnvLocalPaths = [
      path.resolve(currentDir, "../../../.env.local"),
      path.resolve(process.cwd(), ".env.local"),
      path.resolve(process.cwd(), "../.env.local"),
    ];
    for (const envLocalPath of candidateEnvLocalPaths) {
      if (fs.existsSync(envLocalPath)) {
        let content = fs.readFileSync(envLocalPath, "utf8");
        if (content.includes("NEXT_PUBLIC_API_URL=")) {
          content = content.replace(
            /NEXT_PUBLIC_API_URL=.*/,
            `NEXT_PUBLIC_API_URL=http://localhost:${port}/api/v1`
          );
          fs.writeFileSync(envLocalPath, content, "utf8");
          console.log(`[Dynamic Config] Synced NEXT_PUBLIC_API_URL to ${envLocalPath}`);
        }
        break;
      }
    }
  } catch (err: any) {
    console.warn(`[Dynamic Config Notice]`, err.message);
  }
}

async function startServer() {
  console.log(`\n======================================================`);
  console.log(`  The Takeout Box Restaurant Supply - Backend Server  `);
  console.log(`  Environment: ${ENV.NODE_ENV.toUpperCase()} | Port: ${ENV.PORT}`);
  console.log(`  Depot: ${ENV.DEPOT_ADDRESS}`);
  console.log(`======================================================\n`);

  // 1. Check and initialize database
  const isDbConnected = await testDbConnection();
  if (isDbConnected) {
    try {
      await initializeDatabase();
      await seedDatabase();
    } catch (err: any) {
      console.warn(`[Startup Warning] Auto-migration skipped: ${err.message}`);
    }
  } else {
    console.log(`[Notice] Running in Standalone API Mode with local/mock support.`);
    console.log(`[Notice] To enable MySQL, start your MySQL service and configure server/.env.\n`);
  }

  // 2. Verify SMTP Email Service
  EmailService.verifyConnection().catch(() => {});

  // 3. Start HTTP server
  const server = app.listen(ENV.PORT, () => {
    console.log(`[Server] Live and accepting requests at http://localhost:${ENV.PORT}`);
    console.log(`[Server] Health check endpoint: http://localhost:${ENV.PORT}/api/health`);
    console.log(`[Server] API Base URL: http://localhost:${ENV.PORT}/api/v1\n`);
    syncFrontendApiConfig(ENV.PORT);
  });

  // 4. Graceful shutdown
  const shutdown = () => {
    console.log("\n[Server] Shutting down gracefully...");
    server.close(() => {
      console.log("[Server] Closed HTTP connections. Goodbye!");
      process.exit(0);
    });
  };

  process.on("SIGINT", shutdown);
  process.on("SIGTERM", shutdown);
}

startServer().catch((err) => {
  console.error("[Fatal Startup Error]", err);
  process.exit(1);
});
