import express from "express";
import cors from "cors";
import { ENV } from "./config/env.js";
import { sanitizeBody } from "./middleware/sanitizeMiddleware.js";
import { errorHandler } from "./middleware/errorHandler.js";

// Routes
import authRoutes from "./routes/authRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import addressRoutes from "./routes/addressRoutes.js";
import catalogRoutes from "./routes/catalogRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import ratingRoutes from "./routes/ratingRoutes.js";
import wholesaleRoutes from "./routes/wholesaleRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import shippingRoutes from "./routes/shippingRoutes.js";


export const app = express();

// CORS configuration for Next.js frontend
app.use(
  cors({
    origin: [ENV.CLIENT_ORIGIN, "http://localhost:3000", "http://127.0.0.1:3000"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Body parsers
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Sanitize incoming inputs (XSS / Script stripping)
app.use(sanitizeBody);

// System Health Check
app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    service: "The Takeout Box API",
    depot: "5880 District Blvd. Suite 17, Bakersfield, CA 93313",
    timestamp: new Date().toISOString(),
  });
});

// Mount API v1 Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/addresses", addressRoutes);
app.use("/api/v1/catalog", catalogRoutes);
app.use("/api/v1/orders", orderRoutes);
app.use("/api/v1/ratings", ratingRoutes);
app.use("/api/v1/wholesale", wholesaleRoutes);
app.use("/api/v1/cart", cartRoutes);
app.use("/api/v1/chat", chatRoutes);
app.use("/api/v1/shipping", shippingRoutes);
app.use("/api/shipping", shippingRoutes);



// Catch-all 404 for unknown routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `API Route not found: ${req.method} ${req.originalUrl}`,
  });
});

// Centralized error handler
app.use(errorHandler);
