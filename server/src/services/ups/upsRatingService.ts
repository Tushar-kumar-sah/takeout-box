import { ENV } from "../../config/env.js";
import { UpsAuthService } from "./upsAuthService.js";
import { CalculatedPackage, PackagingResult } from "./upsPackagingService.js";
import { AddressInput } from "./upsAddressService.js";

export interface ShippingRateOption {
  carrier: "UPS";
  serviceCode: string;
  serviceName: string;
  rate: number;
  currency: "USD";
  deliveryDays?: number;
  estimatedDelivery?: string;
  guaranteed: boolean;
  rateQuoteReference?: string;
}

export interface RatesResult {
  rates: ShippingRateOption[];
  packageInfo: {
    totalWeight: number;
    weightUnit: "LBS";
    packageCount: number;
    packages: CalculatedPackage[];
  };
  destination: {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  requestTimestamp: string;
}

const UPS_SERVICE_NAMES: Record<string, string> = {
  "03": "UPS Ground",
  "12": "UPS 3 Day Select",
  "02": "UPS 2nd Day Air",
  "59": "UPS 2nd Day Air A.M.",
  "01": "UPS Next Day Air",
  "13": "UPS Next Day Air Saver",
  "14": "UPS Next Day Air Early",
};

export class UpsRatingService {
  /**
   * Validate that the origin (ship-from) address is properly configured
   */
  public static validateOrigin(): {
    company: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  } {
    const address = (ENV.UPS_SHIP_FROM_ADDRESS || ENV.UPS_ORIGIN_STREET || "").trim();
    const city = (ENV.UPS_SHIP_FROM_CITY || ENV.UPS_ORIGIN_CITY || "").trim();
    const state = (ENV.UPS_SHIP_FROM_STATE || ENV.UPS_ORIGIN_STATE || "").trim();
    const zip = (ENV.UPS_SHIP_FROM_ZIP || ENV.UPS_ORIGIN_ZIP || "").trim();
    const country = (ENV.UPS_SHIP_FROM_COUNTRY || ENV.UPS_ORIGIN_COUNTRY || "US").trim();
    const company = (ENV.UPS_SHIP_FROM_COMPANY || "The Takeout Box Restaurant Supply LLC").trim();

    if (!address || !city || !state || !zip) {
      throw new Error("UPS shipping origin is not configured.");
    }

    return { company, address, city, state, zip, country };
  }

  /**
   * Call UPS Rating API (Shop) to get live commercial shipping rates
   */
  public static async calculateRates(
    destination: AddressInput,
    packaging: PackagingResult
  ): Promise<RatesResult> {
    const origin = this.validateOrigin();

    const cleanStreet = (destination.street || "").trim();
    const cleanCity = (destination.city || "").trim();
    const cleanState = (destination.state || "").trim().toUpperCase();
    const cleanZip = (destination.zip || "").trim();

    if (!cleanStreet || !cleanCity || !cleanState || !cleanZip) {
      throw new Error("Destination address must include street, city, state, and ZIP code.");
    }

    const token = await UpsAuthService.getAccessToken();
    const baseUrl = UpsAuthService.getBaseUrl();
    const ratingUrl = `${baseUrl}/api/rating/v1/Shop`;

    const destAddressLines = [cleanStreet];
    if (destination.suite && destination.suite.trim()) {
      destAddressLines.push(destination.suite.trim());
    }

    const upsPackages = packaging.packages.map((pkg) => ({
      PackagingType: {
        Code: "02", // Customer Supplied Package
        Description: "Box",
      },
      Dimensions: {
        UnitOfMeasurement: {
          Code: "IN",
          Description: "Inches",
        },
        Length: String(Math.round(pkg.length)),
        Width: String(Math.round(pkg.width)),
        Height: String(Math.round(pkg.height)),
      },
      PackageWeight: {
        UnitOfMeasurement: {
          Code: "LBS",
          Description: "Pounds",
        },
        Weight: String(pkg.weight.toFixed(1)),
      },
    }));

    const shipperObj: any = {
      Name: origin.company,
      Address: {
        AddressLine: [origin.address],
        City: origin.city,
        StateProvinceCode: origin.state,
        PostalCode: origin.zip,
        CountryCode: "US",
      },
    };

    if (ENV.UPS_ACCOUNT_NUMBER && ENV.UPS_ACCOUNT_NUMBER.trim()) {
      shipperObj.ShipperNumber = ENV.UPS_ACCOUNT_NUMBER.trim();
    }

    const rateRequestBody: any = {
      RateRequest: {
        Request: {
          RequestOption: "Shop",
          TransactionReference: {
            CustomerContext: `TakeoutBoxRate-${Date.now()}`,
          },
        },
        Shipment: {
          Shipper: shipperObj,
          ShipTo: {
            Name: destination.recipientName || destination.businessName || "Customer",
            Address: {
              AddressLine: destAddressLines,
              City: cleanCity,
              StateProvinceCode: cleanState,
              PostalCode: cleanZip.slice(0, 5),
              CountryCode: "US",
            },
          },
          ShipFrom: {
            Name: origin.company,
            Address: {
              AddressLine: [origin.address],
              City: origin.city,
              StateProvinceCode: origin.state,
              PostalCode: origin.zip,
              CountryCode: "US",
            },
          },
          Package: upsPackages,
        },
      },
    };

    if (ENV.UPS_ACCOUNT_NUMBER && ENV.UPS_ACCOUNT_NUMBER.trim()) {
      rateRequestBody.RateRequest.Shipment.PaymentDetails = {
        ShipmentCharge: {
          Type: "01",
          BillShipper: {
            AccountNumber: ENV.UPS_ACCOUNT_NUMBER.trim(),
          },
        },
      };
    }

    console.log(
      `[UPS Rating] Requesting Shop rates for ${packaging.packages.length} package(s) (${packaging.totalWeight} lbs) to ${cleanCity}, ${cleanState} ${cleanZip}...`
    );
    const startTime = Date.now();

    try {
      const response = await fetch(ratingUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(rateRequestBody),
      });

      const durationMs = Date.now() - startTime;
      console.log(`[UPS Rating] UPS responded with HTTP ${response.status} in ${durationMs}ms`);

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`[UPS Rating Error] Status ${response.status}:`, errorText);
        if (response.status === 401) {
          UpsAuthService.clearCache();
        }
        throw new Error(`UPS Rating API returned status ${response.status}`);
      }

      const data = (await response.json()) as any;
      const rateResponse = data?.RateResponse;

      if (!rateResponse) {
        throw new Error("No RateResponse returned from UPS Rating API.");
      }

      const ratedShipmentsRaw = rateResponse.RatedShipment;
      const ratedShipments: any[] = Array.isArray(ratedShipmentsRaw)
        ? ratedShipmentsRaw
        : ratedShipmentsRaw
        ? [ratedShipmentsRaw]
        : [];

      if (ratedShipments.length === 0) {
        return {
          rates: [],
          packageInfo: {
            totalWeight: packaging.totalWeight,
            weightUnit: "LBS",
            packageCount: packaging.packages.length,
            packages: packaging.packages,
          },
          destination: {
            street: cleanStreet,
            city: cleanCity,
            state: cleanState,
            zip: cleanZip,
            country: "US",
          },
          requestTimestamp: new Date().toISOString(),
        };
      }

      const options: ShippingRateOption[] = [];

      for (const shipment of ratedShipments) {
        const serviceCode = shipment.Service?.Code;
        if (!serviceCode) continue;

        const totalCharges = shipment.TotalCharges;
        const rateAmount = parseFloat(totalCharges?.MonetaryValue || "0");
        const currency = (totalCharges?.CurrencyCode || "USD") as "USD";

        if (rateAmount <= 0) continue;

        const serviceName = UPS_SERVICE_NAMES[serviceCode] || `UPS Service ${serviceCode}`;

        // Extract delivery estimate if provided
        let deliveryDays: number | undefined;
        let estimatedDelivery: string | undefined;

        if (shipment.GuaranteedDelivery?.BusinessDaysInTransit) {
          deliveryDays = parseInt(shipment.GuaranteedDelivery.BusinessDaysInTransit, 10);
          if (deliveryDays === 1) {
            estimatedDelivery = "1 Business Day";
          } else if (deliveryDays > 1) {
            estimatedDelivery = `${deliveryDays} Business Days`;
          }
        }

        if (shipment.TimeInTransit?.ServiceSummary?.EstimatedArrival?.Arrival?.Date) {
          const rawDate = shipment.TimeInTransit.ServiceSummary.EstimatedArrival.Arrival.Date; // "YYYYMMDD"
          if (rawDate && rawDate.length === 8) {
            const y = parseInt(rawDate.slice(0, 4), 10);
            const m = parseInt(rawDate.slice(4, 6), 10) - 1;
            const d = parseInt(rawDate.slice(6, 8), 10);
            const arrivalDate = new Date(y, m, d);
            estimatedDelivery = arrivalDate.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              weekday: "short",
            });
          }
        }

        const isGuaranteed = Boolean(shipment.GuaranteedDelivery);
        const rateQuoteReference =
          shipment.RatedShipmentAlert?.[0]?.Description ||
          rateResponse.Response?.TransactionReference?.CustomerContext ||
          `UPS-${serviceCode}-${Date.now()}`;

        options.push({
          carrier: "UPS",
          serviceCode,
          serviceName,
          rate: Math.round(rateAmount * 100) / 100,
          currency: "USD",
          deliveryDays,
          estimatedDelivery,
          guaranteed: isGuaranteed,
          rateQuoteReference,
        });
      }

      // Sort rates lowest to highest price
      options.sort((a, b) => a.rate - b.rate);

      return {
        rates: options,
        packageInfo: {
          totalWeight: packaging.totalWeight,
          weightUnit: "LBS",
          packageCount: packaging.packages.length,
          packages: packaging.packages,
        },
        destination: {
          street: cleanStreet,
          city: cleanCity,
          state: cleanState,
          zip: cleanZip,
          country: "US",
        },
        requestTimestamp: new Date().toISOString(),
      };
    } catch (err: any) {
      console.error("[UPS Rating Exception]", err.message);
      throw err;
    }
  }
}
