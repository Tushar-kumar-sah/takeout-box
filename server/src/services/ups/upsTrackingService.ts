import { pool } from "../../config/db.js";
import { RowDataPacket } from "mysql2";
import { UpsAuthService } from "./upsAuthService.js";

export interface TrackingDetails {
  available: boolean;
  orderId: string;
  carrier: string;
  trackingNumber: string | null;
  shipmentStatus: string;
  statusText: string;
  estimatedDeliveryDate?: string | null;
  shippedAt?: string | null;
  deliveredAt?: string | null;
  activities?: Array<{
    timestamp: string;
    location: string;
    description: string;
  }>;
}

export class UpsTrackingService {
  /**
   * Retrieve tracking details for an order.
   * If no real UPS tracking number exists yet, reports tracking not available.
   * Never generates fake tracking data or false 'shipped' states.
   */
  public static async getOrderTracking(orderId: string): Promise<TrackingDetails> {
    const [shipmentRows] = await pool.execute<RowDataPacket[]>(
      `SELECT * FROM order_shipments WHERE order_id = ? ORDER BY id DESC LIMIT 1`,
      [orderId]
    );

    if (shipmentRows.length === 0) {
      // Check orders table
      const [orderRows] = await pool.execute<RowDataPacket[]>(
        `SELECT id, status, status_text, shipping_carrier, shipping_service FROM orders WHERE id = ? LIMIT 1`,
        [orderId]
      );

      if (orderRows.length === 0) {
        throw new Error(`Order "${orderId}" not found.`);
      }

      return {
        available: false,
        orderId,
        carrier: orderRows[0].shipping_carrier || "UPS",
        trackingNumber: null,
        shipmentStatus: "NOT_CREATED",
        statusText: "Tracking not available yet.",
      };
    }

    const shipment = shipmentRows[0];
    const trackingNumber = shipment.tracking_number;

    if (!trackingNumber) {
      return {
        available: false,
        orderId,
        carrier: shipment.carrier || "UPS",
        trackingNumber: null,
        shipmentStatus: shipment.shipment_status || "RATE_SELECTED",
        statusText: "Tracking not available yet. Shipment has not been dispatched.",
        estimatedDeliveryDate: shipment.estimated_delivery_date,
      };
    }

    // Future implementation: When a real tracking number exists, call UPS Tracking REST API
    // e.g. GET https://onlinetools.ups.com/api/track/v1/details/{trackingNumber}
    try {
      if (UpsAuthService.isConfigured()) {
        const token = await UpsAuthService.getAccessToken();
        const baseUrl = UpsAuthService.getBaseUrl();
        const trackUrl = `${baseUrl}/api/track/v1/details/${encodeURIComponent(trackingNumber)}`;

        console.log(`[UPS Tracking] Checking live status for tracking number ${trackingNumber}...`);
        const res = await fetch(trackUrl, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            transId: `Track-${Date.now()}`,
            transactionSrc: "TheTakeoutBox",
          },
        });

        if (res.ok) {
          const trackData = (await res.json()) as any;
          const pkg = trackData?.trackResponse?.shipment?.[0]?.package?.[0];
          const currentStatus = pkg?.currentStatus?.description || shipment.shipment_status;
          return {
            available: true,
            orderId,
            carrier: "UPS",
            trackingNumber,
            shipmentStatus: currentStatus,
            statusText: currentStatus,
            estimatedDeliveryDate: shipment.estimated_delivery_date,
            shippedAt: shipment.shipped_at,
            deliveredAt: shipment.delivered_at,
          };
        }
      }
    } catch (err: any) {
      console.warn(`[UPS Tracking] Live check failed, returning database record:`, err.message);
    }

    return {
      available: true,
      orderId,
      carrier: shipment.carrier || "UPS",
      trackingNumber,
      shipmentStatus: shipment.shipment_status,
      statusText: shipment.shipment_status,
      estimatedDeliveryDate: shipment.estimated_delivery_date,
      shippedAt: shipment.shipped_at,
      deliveredAt: shipment.delivered_at,
    };
  }
}
