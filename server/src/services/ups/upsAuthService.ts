import { ENV } from "../../config/env.js";

/**
 * Structured UPS API Error containing error type, UPS error code, and status code.
 */
export class UpsApiError extends Error {
  public type: "UPS_AUTH_ERROR" | "UPS_ADDRESS_ERROR";
  public code: string;
  public statusCode: number;
  public details?: any;

  constructor(
    type: "UPS_AUTH_ERROR" | "UPS_ADDRESS_ERROR",
    code: string,
    message: string,
    statusCode = 400,
    details?: any
  ) {
    super(message);
    this.name = "UpsApiError";
    this.type = type;
    this.code = code;
    this.statusCode = statusCode;
    this.details = details;
  }
}

/**
 * UPS OAuth 2.0 Authentication Service
 * Manages token acquisition, validation, and server-side memory caching.
 */
export class UpsAuthService {
  private static cachedToken: string | null = null;
  private static tokenExpiresAt: number = 0;

  /**
   * Determine UPS Base API URL based on configured environment.
   * Ensures sandbox/CIE vs production consistency.
   */
  public static getBaseUrl(): string {
    return ENV.UPS_ENVIRONMENT === "production"
      ? "https://onlinetools.ups.com"
      : "https://wwwcie.ups.com";
  }

  /**
   * Check if UPS credentials are configured without exposing values.
   */
  public static isConfigured(): boolean {
    return Boolean(
      ENV.UPS_CLIENT_ID &&
      ENV.UPS_CLIENT_ID.trim() !== "" &&
      ENV.UPS_CLIENT_SECRET &&
      ENV.UPS_CLIENT_SECRET.trim() !== ""
    );
  }

  /**
   * Acquire a valid OAuth 2.0 Bearer access token, reusing cached token if unexpired.
   * Surfaces exact UPS error codes (e.g., 10401, 250002) if authentication fails.
   */
  public static async getAccessToken(): Promise<string> {
    const environment = ENV.UPS_ENVIRONMENT || "sandbox";
    const clientIdConfigured = Boolean(ENV.UPS_CLIENT_ID && ENV.UPS_CLIENT_ID.trim().length > 0);
    const clientSecretConfigured = Boolean(ENV.UPS_CLIENT_SECRET && ENV.UPS_CLIENT_SECRET.trim().length > 0);
    const accountConfigured = Boolean(ENV.UPS_ACCOUNT_NUMBER && ENV.UPS_ACCOUNT_NUMBER.trim().length > 0);

    // Safe UPS CONFIG debug logging
    console.log(`\nUPS CONFIG:`);
    console.log(`environment: ${environment}`);
    console.log(`clientIdConfigured: ${clientIdConfigured}`);
    console.log(`clientSecretConfigured: ${clientSecretConfigured}`);
    console.log(`accountConfigured: ${accountConfigured}`);

    if (!this.isConfigured()) {
      console.log(`\nOAuth:`);
      console.log(`status: 401`);
      console.log(`success: false`);
      console.log(`UPS error code: MISSING_CREDENTIALS`);
      console.log(`UPS error message: UPS_CLIENT_ID or UPS_CLIENT_SECRET is not configured in server environment.`);

      throw new UpsApiError(
        "UPS_AUTH_ERROR",
        "MISSING_CREDENTIALS",
        "UPS API credentials (UPS_CLIENT_ID or UPS_CLIENT_SECRET) are not configured on the server.",
        401
      );
    }

    const now = Date.now();
    // Return cached token if valid with at least 60 seconds of buffer time
    if (this.cachedToken && now < this.tokenExpiresAt - 60000) {
      console.log(`\nOAuth:`);
      console.log(`status: 200 (cached)`);
      console.log(`success: true`);
      return this.cachedToken;
    }

    const baseUrl = this.getBaseUrl();
    const tokenUrl = `${baseUrl}/security/v1/oauth/token`;
    const basicAuth = Buffer.from(
      `${ENV.UPS_CLIENT_ID.trim()}:${ENV.UPS_CLIENT_SECRET.trim()}`
    ).toString("base64");

    const headers: Record<string, string> = {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${basicAuth}`,
    };

    if (ENV.UPS_ACCOUNT_NUMBER && ENV.UPS_ACCOUNT_NUMBER.trim()) {
      headers["x-merchant-id"] = ENV.UPS_ACCOUNT_NUMBER.trim();
    }

    console.log(`[UPS OAuth] Requesting access token from ${tokenUrl}...`);
    const startTime = Date.now();

    let response: any;
    try {
      response = await fetch(tokenUrl, {
        method: "POST",
        headers,
        body: "grant_type=client_credentials",
      });
    } catch (networkErr: any) {
      console.log(`\nOAuth:`);
      console.log(`status: 503`);
      console.log(`success: false`);
      console.log(`UPS error code: NETWORK_ERROR`);
      console.log(`UPS error message: ${networkErr.message}`);
      throw new UpsApiError(
        "UPS_AUTH_ERROR",
        "NETWORK_ERROR",
        `Failed to reach UPS OAuth endpoint: ${networkErr.message}`,
        503
      );
    }

    const durationMs = Date.now() - startTime;

    if (!response.ok) {
      let errorCode = `HTTP_${response.status}`;
      let errorMessage = `UPS OAuth authentication failed with HTTP ${response.status}`;
      try {
        const errorData = (await response.json()) as any;
        if (errorData?.response?.errors?.[0]) {
          errorCode = errorData.response.errors[0].code || errorCode;
          errorMessage = errorData.response.errors[0].message || errorMessage;
        } else if (errorData?.errors?.[0]) {
          errorCode = errorData.errors[0].code || errorCode;
          errorMessage = errorData.errors[0].message || errorMessage;
        } else if (errorData?.error) {
          errorCode = errorData.error;
          errorMessage = errorData.error_description || errorData.error;
        }
      } catch {
        try {
          const rawText = await response.text();
          if (rawText) errorMessage = rawText;
        } catch {}
      }

      console.log(`\nOAuth:`);
      console.log(`status: ${response.status}`);
      console.log(`success: false`);
      console.log(`UPS error code: ${errorCode}`);
      console.log(`UPS error message: ${errorMessage}`);

      throw new UpsApiError("UPS_AUTH_ERROR", errorCode, errorMessage, response.status);
    }

    const data = (await response.json()) as any;
    if (!data.access_token) {
      console.log(`\nOAuth:`);
      console.log(`status: ${response.status}`);
      console.log(`success: false`);
      console.log(`UPS error code: INVALID_TOKEN_PAYLOAD`);
      console.log(`UPS error message: UPS OAuth response did not contain an access_token.`);
      throw new UpsApiError(
        "UPS_AUTH_ERROR",
        "INVALID_TOKEN_PAYLOAD",
        "UPS OAuth response did not contain an access_token",
        500
      );
    }

    this.cachedToken = data.access_token;
    const expiresInSec = parseInt(data.expires_in || "14400", 10);
    this.tokenExpiresAt = now + expiresInSec * 1000;

    console.log(`\nOAuth:`);
    console.log(`status: ${response.status}`);
    console.log(`success: true`);
    return this.cachedToken!;
  }

  /**
   * Clear cached token if an API call encounters an expired or invalid token error
   */
  public static clearCache(): void {
    this.cachedToken = null;
    this.tokenExpiresAt = 0;
  }
}
