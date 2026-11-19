/**
 * Input sanitization and validation utilities for The Takeout Box application.
 * Prevents XSS, script injection, HTML tag injection, and cleans up input data.
 */

// Regular expressions for validation
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const PHONE_DIGITS_REGEX = /\d/g;
const US_ZIP_REGEX = /^\d{5}(-\d{4})?$/;

/**
 * Strips HTML tags, script injection patterns, and excessive whitespace.
 */
export function sanitizeText(input: string, maxLength: number = 250): string {
  if (typeof input !== "string") return "";
  let clean = input
    // Remove HTML tags
    .replace(/<[^>]*>?/gm, "")
    // Remove javascript: pseudo-protocols
    .replace(/javascript:/gi, "")
    // Remove inline event handlers like onclick, onerror
    .replace(/on\w+\s*=/gi, "")
    // Normalize newlines and tabs
    .replace(/[\r\n\t]+/g, " ")
    .trim();

  if (maxLength > 0 && clean.length > maxLength) {
    clean = clean.slice(0, maxLength);
  }
  return clean;
}

/**
 * Sanitizes search input: removes special HTML/script characters, trims and caps length.
 */
export function sanitizeSearchQuery(input: string, maxLength: number = 80): string {
  if (typeof input !== "string") return "";
  return input
    .replace(/[<>{}[\]\\\/^~`$]/g, "")
    .replace(/javascript:/gi, "")
    .slice(0, maxLength);
}

/**
 * Sanitizes phone numbers by allowing only digits, plus signs, hyphens, parentheses, and spaces.
 */
export function sanitizePhone(input: string): string {
  if (typeof input !== "string") return "";
  return input.replace(/[^\d+()-\s]/g, "").slice(0, 20);
}

/**
 * Validates whether a phone number has at least 10 valid digits.
 */
export function isValidPhone(input: string): boolean {
  if (!input) return false;
  const digits = input.match(PHONE_DIGITS_REGEX);
  return !!digits && digits.length >= 10 && digits.length <= 15;
}

/**
 * Sanitizes email addresses: removes whitespace, lowercases, removes control characters.
 */
export function sanitizeEmail(input: string): string {
  if (typeof input !== "string") return "";
  return input.trim().toLowerCase().replace(/[^\w.@+-]/g, "").slice(0, 100);
}

/**
 * Validates standard email address format.
 */
export function isValidEmail(input: string): boolean {
  if (!input) return false;
  return EMAIL_REGEX.test(input.trim());
}

/**
 * Sanitizes US ZIP postal codes (allows only digits and hyphen).
 */
export function sanitizeZip(input: string): string {
  if (typeof input !== "string") return "";
  return input.replace(/[^\d-]/g, "").slice(0, 10);
}

/**
 * Validates US ZIP code (5 digits or 5+4 format).
 */
export function isValidZip(input: string): boolean {
  if (!input) return false;
  return US_ZIP_REGEX.test(input.trim());
}

/**
 * Sanitizes multiline notes/comments (preserves harmless line breaks, strips HTML/XSS).
 */
export function sanitizeMultilineText(input: string, maxLength: number = 1000, trim: boolean = false): string {
  if (typeof input !== "string") return "";
  let clean = input
    .replace(/<[^>]*>?/gm, "")
    .replace(/javascript:/gi, "")
    .replace(/on\w+\s*=/gi, "");

  if (trim) {
    clean = clean.trim();
  }

  if (maxLength > 0 && clean.length > maxLength) {
    clean = clean.slice(0, maxLength);
  }
  return clean;
}
