import { UpsAuthService, UpsApiError } from "./upsAuthService.js";

export interface AddressInput {
  recipientName?: string;
  businessName?: string;
  street: string;
  suite?: string;
  city: string;
  state: string;
  zip: string;
  country?: string;
}

export interface NormalizedAddress {
  street: string;
  suite?: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

export interface AddressValidationResult {
  valid: boolean;
  standardized: boolean;
  classification?: "Commercial" | "Residential" | "Unknown";
  message: string;
  originalAddress: NormalizedAddress;
  suggestedAddress?: NormalizedAddress;
  candidates?: NormalizedAddress[];
}

export class UpsAddressService {
  /**
   * Validate destination address using UPS Address Validation (XAV API)
   */
  public static async validateAddress(address: AddressInput): Promise<AddressValidationResult> {
    const cleanStreet = (address.street || "").trim();
    const cleanSuite = (address.suite || "").trim();
    const cleanCity = (address.city || "").trim();
    const cleanState = (address.state || "").trim().toUpperCase();
    const cleanZip = (address.zip || "").trim();
    const country = "US"; // USA only

    const originalAddress: NormalizedAddress = {
      street: cleanStreet,
      suite: cleanSuite || undefined,
      city: cleanCity,
      state: cleanState,
      zip: cleanZip,
      country: "US",
    };

    // Fast-fail if minimum US address components are missing
    if (!cleanStreet || !cleanCity || !cleanState || !cleanZip) {
      return {
        valid: false,
        standardized: false,
        message: "Street address, City, State, and ZIP Code are required.",
        originalAddress,
      };
    }

    // Step 3: Verify UPS OAuth First before calling Address Validation
    const token = await UpsAuthService.getAccessToken();

    // Step 4 & 5: Build valid UPS Address Validation request
    const baseUrl = UpsAuthService.getBaseUrl();
    const xavUrl = `${baseUrl}/api/addressvalidation/v1/1`;

    const addressLines = [cleanStreet];
    if (cleanSuite) {
      addressLines.push(cleanSuite);
    }

    const requestPayload = {
      XAVRequest: {
        AddressKeyFormat: {
          ConsigneeName: address.recipientName || address.businessName || "Customer",
          ...(address.businessName ? { BuildingName: address.businessName } : {}),
          AddressLine: addressLines,
          PoliticalDivision2: cleanCity,
          PoliticalDivision1: cleanState,
          PostcodePrimaryLow: cleanZip.slice(0, 5),
          CountryCode: "US",
        },
      },
    };

    console.log(`\nAddress Validation:`);
    console.log(`request URL: ${xavUrl}`);
    console.log(`request address: ${addressLines.join(", ")}, ${cleanCity}, ${cleanState} ${cleanZip.slice(0, 5)}, US`);

    const startTime = Date.now();
    let response: any;

    try {
      response = await fetch(xavUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestPayload),
      });
    } catch (networkErr: any) {
      console.log(`Address Validation:`);
      console.log(`status: 503`);
      console.log(`UPS error code: NETWORK_ERROR`);
      console.log(`UPS error message: ${networkErr.message}`);
      throw new UpsApiError(
        "UPS_ADDRESS_ERROR",
        "NETWORK_ERROR",
        `Failed to reach UPS Address Validation endpoint: ${networkErr.message}`,
        503
      );
    }

    const durationMs = Date.now() - startTime;

    if (!response.ok) {
      let errorCode = `HTTP_${response.status}`;
      let errorMessage = `UPS Address Validation failed with HTTP ${response.status}`;

      try {
        const errorData = (await response.json()) as any;
        if (errorData?.response?.errors?.[0]) {
          errorCode = errorData.response.errors[0].code || errorCode;
          errorMessage = errorData.response.errors[0].message || errorMessage;
        } else if (errorData?.errors?.[0]) {
          errorCode = errorData.errors[0].code || errorCode;
          errorMessage = errorData.errors[0].message || errorMessage;
        }
      } catch {
        try {
          const rawText = await response.text();
          if (rawText) errorMessage = rawText;
        } catch {}
      }

      console.log(`Address Validation:`);
      console.log(`status: ${response.status}`);
      console.log(`UPS error code: ${errorCode}`);
      console.log(`UPS error message: ${errorMessage}`);

      // Clear token cache in case of 401
      if (response.status === 401) {
        UpsAuthService.clearCache();
      }

      throw new UpsApiError("UPS_ADDRESS_ERROR", errorCode, errorMessage, response.status);
    }

    const data = (await response.json()) as any;
    const xav = data?.XAVResponse;

    if (!xav) {
      console.log(`Address Validation:`);
      console.log(`status: ${response.status}`);
      console.log(`UPS error code: MISSING_XAV_RESPONSE`);
      console.log(`UPS error message: UPS response missing XAVResponse object.`);
      throw new UpsApiError(
        "UPS_ADDRESS_ERROR",
        "MISSING_XAV_RESPONSE",
        "UPS Address Validation response did not contain XAVResponse.",
        502
      );
    }

    console.log(`Address Validation:`);
    console.log(`status: ${response.status}`);
    console.log(`success: true`);

    // Check indicators
    const noCandidates = Boolean(xav.NoCandidatesIndicator !== undefined);
    if (noCandidates) {
      console.log(`[UPS Address Result] No matching candidates found for address.`);
      return {
        valid: false,
        standardized: false,
        message: "We couldn't find a matching US address for the details provided. Please check: Street address, City, State, and ZIP Code.",
        originalAddress,
      };
    }

    // Determine classification
    let classification: "Commercial" | "Residential" | "Unknown" = "Unknown";
    const code = xav.AddressClassification?.Code;
    if (code === "1" || code === 1) classification = "Commercial";
    else if (code === "2" || code === 2) classification = "Residential";

    // Parse candidate address if available
    const rawCandidates = Array.isArray(xav.Candidate)
      ? xav.Candidate
      : xav.Candidate
      ? [xav.Candidate]
      : [];

    if (rawCandidates.length === 0) {
      // Valid address indicator with no candidate alteration needed
      return {
        valid: true,
        standardized: false,
        classification,
        message: "Address verified successfully.",
        originalAddress,
      };
    }

    // Extract primary candidate format
    const primaryCandidate = rawCandidates[0];
    const keyFormat = primaryCandidate?.AddressKeyFormat || {};

    let candidateStreet = "";
    let candidateSuite = "";

    if (Array.isArray(keyFormat.AddressLine)) {
      candidateStreet = keyFormat.AddressLine[0] || cleanStreet;
      candidateSuite = keyFormat.AddressLine.slice(1).join(" ") || cleanSuite;
    } else if (typeof keyFormat.AddressLine === "string") {
      candidateStreet = keyFormat.AddressLine;
      candidateSuite = cleanSuite;
    } else {
      candidateStreet = cleanStreet;
    }

    const candidateCity = keyFormat.PoliticalDivision2 || cleanCity;
    const candidateState = keyFormat.PoliticalDivision1 || cleanState;
    const primaryLow = keyFormat.PostcodePrimaryLow || cleanZip.slice(0, 5);
    const extendedLow = keyFormat.PostcodeExtendedLow;
    const candidateZip = extendedLow ? `${primaryLow}-${extendedLow}` : primaryLow;

    const suggestedAddress: NormalizedAddress = {
      street: candidateStreet,
      suite: candidateSuite || undefined,
      city: candidateCity,
      state: candidateState,
      zip: candidateZip,
      country: "US",
    };

    // Check if candidate differs meaningfully from entered address
    const isDifferent =
      cleanStreet.toLowerCase().replace(/[^a-z0-9]/g, "") !==
        candidateStreet.toLowerCase().replace(/[^a-z0-9]/g, "") ||
      cleanCity.toLowerCase() !== candidateCity.toLowerCase() ||
      cleanZip.slice(0, 5) !== primaryLow;

    return {
      valid: true,
      standardized: isDifferent,
      classification,
      message: isDifferent
        ? "We found a standardized version of your address."
        : "Address verified successfully.",
      originalAddress,
      suggestedAddress: isDifferent ? suggestedAddress : undefined,
    };
  }
}
