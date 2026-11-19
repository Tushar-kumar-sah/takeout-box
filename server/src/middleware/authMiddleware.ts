import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { ENV } from "../config/env.js";

export interface AuthenticatedUser {
  id: string;
  firebaseUid: string;
  phone?: string;
  email?: string;
  role: "customer" | "admin";
}

// Extend Express Request
declare global {
  namespace Express {
    interface Request {
      user?: AuthenticatedUser;
    }
  }
}

/**
 * Middleware that strictly requires a valid JWT token
 */
export function requireAuth(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({
      success: false,
      message: "Authorization token required. Please log in.",
    });
    return;
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, ENV.JWT_SECRET) as AuthenticatedUser;
    req.user = decoded;
    next();
  } catch (err: any) {
    res.status(401).json({
      success: false,
      message: "Invalid or expired session. Please log in again.",
    });
  }
}

/**
 * Middleware that attaches user to req if token is provided, but allows unauthenticated requests
 */
export function optionalAuth(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];
    try {
      const decoded = jwt.verify(token, ENV.JWT_SECRET) as AuthenticatedUser;
      req.user = decoded;
    } catch {
      // Ignored for optional auth
    }
  }
  next();
}

/**
 * Middleware that strictly requires the user to have role 'admin'
 */
export function requireAdmin(req: Request, res: Response, next: NextFunction): void {
  if (!req.user) {
    res.status(401).json({
      success: false,
      message: "Authentication required for admin access.",
    });
    return;
  }

  if (req.user.role !== "admin") {
    res.status(403).json({
      success: false,
      message: "Forbidden: Administrative privileges required.",
    });
    return;
  }

  next();
}
