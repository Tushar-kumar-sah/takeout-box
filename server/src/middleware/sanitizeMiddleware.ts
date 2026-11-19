import { Request, Response, NextFunction } from "express";

function cleanValue(val: any): any {
  if (typeof val === "string") {
    return val
      .replace(/<[^>]*>?/gm, "")
      .replace(/javascript:/gi, "")
      .replace(/on\w+\s*=/gi, "")
      .trim();
  }
  if (Array.isArray(val)) {
    return val.map(cleanValue);
  }
  if (val !== null && typeof val === "object") {
    const cleaned: Record<string, any> = {};
    for (const key of Object.keys(val)) {
      cleaned[key] = cleanValue(val[key]);
    }
    return cleaned;
  }
  return val;
}

/**
 * Middleware that strips HTML tags and script injection attempts from request body
 */
export function sanitizeBody(req: Request, res: Response, next: NextFunction): void {
  if (req.body && typeof req.body === "object") {
    req.body = cleanValue(req.body);
  }
  next();
}
